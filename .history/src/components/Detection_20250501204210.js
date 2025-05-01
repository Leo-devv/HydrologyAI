import React, { useState, useRef } from 'react';
import axios from 'axios';

const Detection = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [detectionResult, setDetectionResult] = useState(null);
    const [error, setError] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const resetState = () => {
        setSelectedImage(null);
        setDetectionResult(null);
        setError(null);
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileInput = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        // Check file size (maximum 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError("File too large. Maximum size is 10MB.");
            return;
        }

        // Check file type
        const validTypes = ['image/jpeg', 'image/png', 'image/tiff'];
        if (!validTypes.includes(file.type)) {
            setError("Unsupported file type. Please upload a JPEG, PNG, or TIFF image.");
            return;
        }

        setError(null);
        setSelectedImage(file);

        // Create a preview
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.getElementById('preview-image');
            if (img) {
                img.src = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    };

    const handleImageUpload = async () => {
        if (!selectedImage) {
            setError("Please select an image first");
            return;
        }

        setIsLoading(true);
        setError(null);
        setDetectionResult(null);

        const formData = new FormData();
        formData.append('file', selectedImage);

        try {
            const response = await axios.post('http://localhost:8000/detect', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setDetectionResult(response.data);
        } catch (err) {
            if (err.response) {
                // Server responded with an error
                setError(err.response.data.detail || "Error processing image");
            } else if (err.request) {
                // No response received
                setError("Cannot connect to the server. Please check if the backend is running.");
            } else {
                // Other error
                setError("Error uploading image: " + err.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleTryAgain = () => {
        resetState();
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="detection-container">
            <h2 className="section-title">Satellite Image Analysis</h2>
            
            {!selectedImage && !detectionResult && (
                <div 
                    className={`upload-area ${isDragging ? 'dragging' : ''}`}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <div className="upload-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 18V6M12 6L7 11M12 6L17 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M3 20H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                        </svg>
                    </div>
                    <p className="upload-text">Drag & drop your satellite image here or</p>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileInput}
                        accept="image/jpeg,image/png,image/tiff"
                        style={{ display: 'none' }}
                    />
                    <button 
                        className="browse-button"
                        onClick={() => fileInputRef.current.click()}
                    >
                        Browse Files
                    </button>
                    <p className="file-type-hint">Supported formats: JPEG, PNG, TIFF</p>
                </div>
            )}

            {selectedImage && !detectionResult && (
                <div className="preview-container">
                    <div className="image-preview">
                        <img id="preview-image" alt="Preview" />
                    </div>
                    <div className="preview-actions">
                        <button 
                            className="analyze-button"
                            onClick={handleImageUpload}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner"></span>
                                    Analyzing...
                                </>
                            ) : (
                                "Analyze Image"
                            )}
                        </button>
                        <button 
                            className="cancel-button"
                            onClick={handleTryAgain}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {error && (
                <div className="error-message">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
                        <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                        <circle cx="12" cy="16" r="1" fill="currentColor"></circle>
                    </svg>
                    <p>{error}</p>
                    <button 
                        className="try-again-button"
                        onClick={handleTryAgain}
                    >
                        Try Again
                    </button>
                </div>
            )}

            {detectionResult && (
                <div className="results-container">
                    <div className="results-header">
                        <h3>Analysis Results</h3>
                        {detectionResult.water_body ? (
                            <div className="confidence-badge">
                                {Math.round(detectionResult.confidence * 100)}% Confidence
                            </div>
                        ) : (
                            <div className="confidence-badge low">
                                Not Detected
                            </div>
                        )}
                    </div>
                    
                    <p className="result-summary">{detectionResult.changes}</p>
                    
                    {detectionResult.details && (
                        <div className="result-details">
                            {detectionResult.details.map((detail, index) => (
                                <div className="detail-item" key={index}>
                                    <span className="detail-label">{detail.label}:</span>
                                    <span className="detail-value">{detail.value}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    <button 
                        className="analyze-button"
                        onClick={handleTryAgain}
                    >
                        Analyze Another Image
                    </button>
                </div>
            )}
        </div>
    );
};

export default Detection; 