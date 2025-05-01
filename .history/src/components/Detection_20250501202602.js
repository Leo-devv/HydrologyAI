import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Detection = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [detectionResult, setDetectionResult] = useState(null);
    const [error, setError] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.1 });

        const section = document.getElementById('detect');
        if (section) observer.observe(section);

        return () => {
            if (section) observer.unobserve(section);
        };
    }, []);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setSelectedImage(URL.createObjectURL(file));
        setIsLoading(true);
        setError(null);

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

    return (
        <section
            id="detect"
            className={`py-24 bg-gradient-to-b from-[var(--color-bg)] to-[var(--color-bg-secondary)] ${isVisible ? 'visible' : ''}`}
        >
            <div className="container">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16 animate-fadeUp">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Hydrological Detection</h2>
                        <div className="accent-line mx-auto"></div>
                        <p className="text-[var(--color-text-secondary)] mt-6 max-w-2xl mx-auto">
                            Upload a satellite image to detect water bodies and analyze hydrological changes with our advanced AI algorithms.
                        </p>
                    </div>

                    <div className="glass p-2 animate-fadeUp delay-200">
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

                            {!selectedImage ? (
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
                            ) : (
                                <div className="space-y-8">
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

                                    {error && (
                                        <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                                            <p className="text-red-400">{error}</p>
                                        </div>
                                    )}

                                    {detectionResult && !isLoading && (
                                        <div className="results-container animate-fadeIn relative">
                                            <h3 className="text-xl font-semibold mb-6">Detection Results</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                                {detectionResult.details.map((detail, index) => (
                                                    <div key={index} className="results-item">
                                                        <div className="text-[var(--color-text-secondary)] text-sm mb-1">{detail.label}</div>
                                                        <div className="text-lg font-semibold">{detail.value}</div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="p-4 rounded-lg bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20">
                                                <p className="text-[var(--color-accent)]">{detectionResult.changes}</p>
                                                <div className="mt-2 flex items-center">
                                                    <div className="w-full bg-[var(--color-bg-secondary)] h-1.5 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-[var(--color-accent)]"
                                                            style={{ width: `${detectionResult.confidence * 100}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="ml-2 text-sm whitespace-nowrap">
                                                        {(detectionResult.confidence * 100).toFixed(2)}%
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-6 text-center">
                                                <label htmlFor="image-upload" className="btn btn-outline">
                                                    Upload a new image
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Detection; 