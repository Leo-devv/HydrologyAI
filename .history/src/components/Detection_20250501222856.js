import React, { useState, useRef, useCallback } from 'react';
import axios from 'axios';

const Detection = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [afterImage, setAfterImage] = useState(null);
    const [detectionResult, setDetectionResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [stage, setStage] = useState('upload');
    const [processingStep, setProcessingStep] = useState(0);

    const fileInputRef = useRef(null);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    }, []);

    const handleFileInput = useCallback((e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    }, []);

    const handleFile = (file) => {
        const validImageTypes = ['image/jpeg', 'image/png', 'image/tiff', 'image/jpg'];
        if (!validImageTypes.includes(file.type)) {
            setError('Please upload a valid image file (JPEG, PNG, or TIFF)');
            return;
        }

        setError(null);
        setFile(file);

        const reader = new FileReader();
        reader.onload = (e) => {
            setAfterImage(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const simulateProcessing = () => {
        const steps = ['Preparing image', 'Detecting water bodies', 'Analyzing changes', 'Generating report'];
        let currentStep = 0;

        const interval = setInterval(() => {
            if (currentStep < steps.length - 1) {
                currentStep++;
                setProcessingStep(currentStep);
            } else {
                clearInterval(interval);
                const mockResult = {
                    changeDetected: true,
                    waterAreaBefore: 156.78,
                    waterAreaAfter: 183.42,
                    changePercentage: 17.1,
                    confidence: 94.3,
                    summary: 'Significant increase in water surface area detected, primarily in the northeast region. The change appears to be due to recent precipitation events.',
                    changes: [
                        { type: 'increase', area: 32.15, confidence: 96.7, location: 'Northeast' },
                        { type: 'decrease', area: 5.51, confidence: 89.2, location: 'Southwest' }
                    ]
                };
                setDetectionResult(mockResult);
                setLoading(false);
                setStage('results');
            }
        }, 1000);
    };

    const handleProcessImage = async () => {
        if (!file) return;

        setLoading(true);
        setStage('processing');
        setError(null);
        setProcessingStep(0);

        try {
            simulateProcessing();
        } catch (err) {
            setError('An error occurred while processing the image. Please try again.');
            setLoading(false);
            setStage('upload');
        }
    };

    const handleReset = () => {
        setFile(null);
        setAfterImage(null);
        setDetectionResult(null);
        setError(null);
        setStage('upload');
        setProcessingStep(0);
    };

    const renderProcessingStep = (index, label) => (
        <div className={`step ${processingStep > index ? 'completed' : processingStep === index ? 'active' : ''}`}>
            <div className="step-indicator"></div>
            <div className="step-label">{label}</div>
        </div>
    );

    return (
        <div className="detection-section">
            <div className="section-header">
                <h2>Water Change Detection</h2>
                <p>Upload a satellite image to analyze water body changes</p>
            </div>

            {stage === 'upload' && (
                <div className="detection-upload-container">
                    <div
                        className={`upload-area ${isDragging ? 'dragging' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current.click()}
                    >
                        {!afterImage ? (
                            <>
                                <div className="upload-icon">
                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 14V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 3L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M16 7L12 3L8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="upload-text">Drag & drop a satellite image or click to browse</h3>
                                <button className="browse-button">Select Image</button>
                                <p className="file-type-hint">Accepts JPEG, PNG, and TIFF files</p>
                            </>
                        ) : (
                            <div className="image-preview">
                                <img src={afterImage} alt="Selected satellite" />
                                <div className="file-info">
                                    <span className="file-name">{file.name}</span>
                                    <span className="file-size">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                                </div>
                            </div>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileInput}
                            accept="image/jpeg,image/png,image/tiff,image/jpg"
                            style={{ display: 'none' }}
                        />
                    </div>

                    {error && (
                        <div className="error-message">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p>{error}</p>
                        </div>
                    )}

                    {afterImage && (
                        <div className="detection-actions">
                            <button className="primary-button" onClick={handleProcessImage}>
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" />
                                    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Process Image
                            </button>
                            <button className="secondary-button" onClick={handleReset}>
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Remove
                            </button>
                        </div>
                    )}
                </div>
            )}

            {stage === 'processing' && (
                <div className="processing-container">
                    <div className="processing-animation">
                        <div className="spinner"></div>
                    </div>
                    <h3>Processing Your Image</h3>
                    <div className="processing-steps">
                        {renderProcessingStep(0, 'Preparing image')}
                        {renderProcessingStep(1, 'Detecting water bodies')}
                        {renderProcessingStep(2, 'Analyzing changes')}
                        {renderProcessingStep(3, 'Generating report')}
                    </div>
                    <button className="secondary-button" onClick={handleReset}>Cancel</button>
                </div>
            )}

            {stage === 'results' && detectionResult && (
                <div className="results-container">
                    <div className="results-header">
                        <h3>Analysis Results</h3>
                        <div className={`confidence-badge ${detectionResult.confidence >= 90 ? 'high' : 'medium'}`}>
                            {detectionResult.confidence}% Confidence
                        </div>
                    </div>

                    <div className="results-summary">
                        <p>{detectionResult.summary}</p>
                    </div>

                    <div className="results-grid">
                        <div className="result-card">
                            <div className="result-icon">
                                <svg viewBox="0 0 24 24" width="24" height="24">
                                    <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z" fill="currentColor" />
                                </svg>
                            </div>
                            <div className="result-content">
                                <div className="result-value">{detectionResult.waterAreaBefore.toFixed(2)} km²</div>
                                <div className="result-label">Initial Water Area</div>
                            </div>
                        </div>

                        <div className="result-card">
                            <div className="result-icon">
                                <svg viewBox="0 0 24 24" width="24" height="24">
                                    <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z" fill="currentColor" />
                                </svg>
                            </div>
                            <div className="result-content">
                                <div className="result-value">{detectionResult.waterAreaAfter.toFixed(2)} km²</div>
                                <div className="result-label">Current Water Area</div>
                            </div>
                        </div>

                        <div className="result-card">
                            <div className="result-icon change-icon">
                                <svg viewBox="0 0 24 24" width="24" height="24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor" />
                                    <path d="M9 13l3-4 3 4H9z" fill="currentColor" />
                                </svg>
                            </div>
                            <div className="result-content">
                                <div className="result-value">+{detectionResult.changePercentage.toFixed(1)}%</div>
                                <div className="result-label">Area Change</div>
                            </div>
                        </div>
                    </div>

                    <div className="changes-list">
                        <h4>Detected Changes</h4>
                        {detectionResult.changes.map((change, index) => (
                            <div key={index} className={`change-item ${change.type}`}>
                                <div className="change-icon">
                                    <svg viewBox="0 0 24 24" width="20" height="20">
                                        <path d={change.type === 'increase' ? "M7 14l5-5 5 5H7z" : "M7 10l5 5 5-5H7z"} fill="currentColor" />
                                    </svg>
                                </div>
                                <div className="change-details">
                                    <div className="change-title">
                                        {change.type === 'increase' ? 'Water Increase' : 'Water Decrease'} - {change.location}
                                    </div>
                                    <div className="change-stats">
                                        <span>{change.area.toFixed(2)} km²</span>
                                        <span>{change.confidence.toFixed(1)}% confidence</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="results-actions">
                        <button className="primary-button" onClick={handleReset}>
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4V9H4.58152M19.9381 11C19.446 7.05369 16.0796 4 12 4C8.64262 4 5.76829 6.06817 4.58152 9M4.58152 9H9M20 20V15H19.4185M19.4185 15C18.2317 17.9318 15.3574 20 12 20C7.92038 20 4.55399 16.9463 4.06189 13M19.4185 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Analyze Another Image
                        </button>
                        <button className="secondary-button">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M17 8L12 3M12 3L7 8M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Download Report
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Detection; 