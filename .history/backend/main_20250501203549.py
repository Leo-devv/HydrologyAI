from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from PIL import Image
import io
import requests
from typing import Dict, List
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Hydrological Change Detection API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Check if cv2 and tensorflow are available
CV2_AVAILABLE = False
TF_AVAILABLE = False

try:
    import cv2
    CV2_AVAILABLE = True
except ImportError:
    print("OpenCV (cv2) not available. Some functionality will be limited.")

try:
    import tensorflow as tf
    TF_AVAILABLE = True
except ImportError:
    print("TensorFlow not available. Model-based detection will be limited.")

# NASA Earthdata API configuration
NASA_API_KEY = os.getenv("NASA_API_KEY")
NASA_BASE_URL = "https://earthdata.nasa.gov/api"

SUPPORTED_FORMATS = [".jpg", ".jpeg", ".png", ".tif", ".tiff"]

class DetectionService:
    def __init__(self):
        # Initialize models and configurations
        self.models = {
            "water_boundary": self._load_model("water_boundary"),
            "change_detection": self._load_model("change_detection")
        }

    def _load_model(self, model_type: str):
        # In a real implementation, this would load the actual models
        # For now, we'll return a mock function
        return lambda x: self._mock_prediction(x, model_type)

    def _mock_prediction(self, image: np.ndarray, model_type: str) -> Dict:
        # Mock prediction function
        if model_type == "water_boundary":
            return {
                "water_area": 2.5,
                "boundary_points": [],
                "confidence": 0.95
            }
        else:
            return {
                "change_percentage": 15.0,
                "change_type": "increase",
                "confidence": 0.92
            }

    def check_image_is_satellite(self, image: np.ndarray) -> bool:
        """Check if the image appears to be a satellite image based on simple heuristics"""
        # In a real implementation, you would have more sophisticated checks
        # For now, we'll just return True to simulate acceptance
        return True

    async def process_image(self, image: np.ndarray, filename: str) -> Dict:
        # Check if file extension is supported
        _, file_extension = os.path.splitext(filename.lower())
        if file_extension not in SUPPORTED_FORMATS:
            raise HTTPException(
                status_code=400, 
                detail=f"Unsupported file format: {file_extension}. Supported formats are: {', '.join(SUPPORTED_FORMATS)}"
            )
        
        # Check if the image appears to be a satellite image
        if not self.check_image_is_satellite(image):
            return {
                "water_body": False,
                "confidence": 0.1,
                "changes": "This doesn't appear to be a satellite image",
                "details": [
                    {"label": "Detection Type", "value": "Not Supported"},
                    {"label": "Recommendation", "value": "Please upload a satellite image"},
                    {"label": "Supported Types", "value": "Satellite imagery of water bodies"}
                ]
            }
        
        # Process image through the pipeline
        water_boundary = self.models["water_boundary"](image)
        change_detection = self.models["change_detection"](image)

        return {
            "water_body": True,
            "confidence": water_boundary["confidence"],
            "changes": f"Detected water body with {water_boundary['confidence']*100:.2f}% confidence",
            "details": [
                {"label": "Water Surface Area", "value": f"{water_boundary['water_area']} km²"},
                {"label": "Change Rate", "value": f"{change_detection['change_percentage']}% since last month"},
                {"label": "Water Quality", "value": "Good"}
            ]
        }

detection_service = DetectionService()

@app.post("/detect")
async def detect_changes(file: UploadFile = File(...)):
    # Check file size (10MB limit)
    content = await file.read()
    if len(content) > 10 * 1024 * 1024:
        raise HTTPException(
            status_code=413,
            detail="File too large. Maximum size is 10MB."
        )
    
    try:
        # Read and process the uploaded image
        image = Image.open(io.BytesIO(content))
        image_np = np.array(image)
        
        # Process the image
        result = await detection_service.process_image(image_np, file.filename)
        
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing image: {str(e)}"
        )

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "cv2_available": CV2_AVAILABLE,
        "tensorflow_available": TF_AVAILABLE
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 