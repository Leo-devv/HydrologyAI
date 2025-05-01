import React, { useState } from 'react';
import axios from 'axios';

const Detection = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [detectionResult, setDetectionResult] = useState(null);
    const [error, setError] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setSelectedImage(URL.createObjectURL(file));
        setIsLoading(true);
        setError(null);
        setDetectionResult(null);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post('http://localhost:8000/detect', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setDetectionResult(response.data);
        } catch (err) {
            setError('Error processing image. Please try again.');
            console.error('Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];

            // Manually trigger file input change
            const fileInput = document.getElementById('image-upload');
            if (fileInput) {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                fileInput.files = dataTransfer.files;

                // Manually trigger the upload handler
                handleImageUpload({ target: { files: [file] } });
            }
        }
    };

    const handleUploadAnother = () => {
        setSelectedImage(null);
        setDetectionResult(null);
    };

    return (
        <section id="detect" className="detection-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2>Hydrological Detection System</h2>
                    <div className="accent-line mx-auto"></div>
                    <p className="section-subtitle">
                        Upload satellite imagery to analyze water bodies and detect hydrological changes
                    </p>
                </div>

                <div className="detection-container">
                    {!selectedImage ? (
                        <div
                            className={`upload-area ${isDragging ? 'border-[var(--color-accent)]' : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                id="image-upload"
                            />
                            <label htmlFor="image-upload" className="cursor-pointer block">
                                <div className="upload-icon animate-pulse-border">
                                    <svg className="w-10 h-10 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-medium mb-2">Drop your image here</h3>
                                <p className="text-[var(--color-text-secondary)] mb-4">or click to browse files</p>
                                <span className="inline-block text-sm text-[var(--color-text-secondary)] px-3 py-1 rounded-full border border-[var(--color-border)]">
                                    PNG, JPG, GIF up to 10MB
                                </span>
                            </label>
                        </div>
                    ) : (
                        <div className="results-view">
                            <div className="results-grid">
                                <div className="image-preview-container">
                                    <div className="image-preview">
                                        <img
                                            src={selectedImage}
                                            alt="Uploaded"
                                            className="w-full"
                                        />
                                        {isLoading && (
                                            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40">
                                                <div className="loader"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="detection-results">
                                    {error && (
                                        <div className="error-message">
                                            <div className="error-icon">
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <p>{error}</p>
                                        </div>
                                    )}

                                    {isLoading && (
                                        <div className="processing-status">
                                            <h3 className="text-xl font-semibold mb-3">Processing Image</h3>
                                            <p className="text-[var(--color-text-secondary)]">
                                                Our AI is analyzing water bodies and detecting changes...
                                            </p>
                                        </div>
                                    )}

                                    {detectionResult && !isLoading && (
                                        <div className="results-container animate-fadeIn">
                                            <h3 className="text-xl font-semibold mb-6">Detection Results</h3>
                                            <div className="grid grid-cols-1 gap-4 mb-6">
                                                {detectionResult.details.map((detail, index) => (
                                                    <div key={index} className="results-item">
                                                        <div className="text-[var(--color-text-secondary)] text-sm mb-1">{detail.label}</div>
                                                        <div className="text-lg font-semibold">{detail.value}</div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="results-highlight">
                                                <p className="text-[var(--color-accent)]">{detectionResult.changes}</p>
                                                <div className="confidence-bar">
                                                    <div className="confidence-label">Confidence</div>
                                                    <div className="confidence-meter">
                                                        <div
                                                            className="confidence-value"
                                                            style={{ width: `${detectionResult.confidence * 100}%` }}
                                                        ></div>
                                                    </div>
                                                    <div className="confidence-percentage">
                                                        {(detectionResult.confidence * 100).toFixed(2)}%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="text-center mt-8">
                                <button onClick={handleUploadAnother} className="btn btn-primary">
                                    Upload Another Image
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Detection; 