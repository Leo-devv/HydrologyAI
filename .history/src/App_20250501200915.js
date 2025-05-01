import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        // Here you would typically send the image to your backend for processing
        // For now, we'll just show a mock detection result
        setDetectionResult({
          waterBody: true,
          confidence: 0.95,
          changes: "Detected water body with 95% confidence"
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <svg className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2002000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="ml-2 text-xl font-semibold text-blue-600">Hydrology AI</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#overview" className="text-gray-600 hover:text-blue-600">Overview</a>
              <a href="#detect" className="text-gray-600 hover:text-blue-600">Detect</a>
              <a href="#technologies" className="text-gray-600 hover:text-blue-600">Technologies</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            AI-Powered Hydrological Change Detection
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Leveraging artificial intelligence to analyze satellite imagery and detect hydrological changes for better environmental management.
          </p>
          <a href="#detect" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 inline-block">
            Try Detection
          </a>
        </div>
      </section>

      {/* Detection Section */}
      <section id="detect" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Upload Image for Detection</h2>
          <div className="max-w-2xl mx-auto">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer block"
              >
                {selectedImage ? (
                  <div className="space-y-4">
                    <img
                      src={selectedImage}
                      alt="Uploaded"
                      className="max-h-96 mx-auto rounded-lg shadow-lg"
                    />
                    {detectionResult && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <h3 className="text-lg font-semibold text-blue-800">Detection Results</h3>
                        <p className="text-gray-700">{detectionResult.changes}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          Confidence: {(detectionResult.confidence * 100).toFixed(2)}%
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-600">Click to upload an image or drag and drop</p>
                    <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why This Matters</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Climate Change Impact</h3>
              <p className="text-gray-600">Early detection of water body changes helps in managing climate change impacts and preserving ecosystems.</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Automated Monitoring</h3>
              <p className="text-gray-600">Replace manual surveys with AI-powered automated monitoring for faster and more accurate results.</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Resource Management</h3>
              <p className="text-gray-600">Enable better decision-making for governments and environmental agencies in water resource management.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Technologies We Use</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="text-4xl mb-2">🤖</div>
              <h3 className="font-semibold">Machine Learning</h3>
              <p className="text-sm text-gray-600">CNN + LSTM</p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-2">👁️</div>
              <h3 className="font-semibold">Computer Vision</h3>
              <p className="text-sm text-gray-600">U-Net & Watershed</p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-2">🛰️</div>
              <h3 className="font-semibold">Satellite Data</h3>
              <p className="text-sm text-gray-600">NASA Earthdata</p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-2">☁️</div>
              <h3 className="font-semibold">Cloud Services</h3>
              <p className="text-sm text-gray-600">AWS/Azure/GCP</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <p className="text-gray-600 mb-8">Interested in learning more about our hydrological change detection system?</p>
          <a 
            href="mailto:leooo.dev@gmail.com" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 inline-block"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Hydrology AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
