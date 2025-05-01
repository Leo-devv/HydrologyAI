import React, { useState } from 'react';
import axios from 'axios';

const Detection = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [detectionResult, setDetectionResult] = useState(null);
    const [error, setError] = useState(null);

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

    return (
        <section id="detect" className="py-20 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center mb-16 neon-text animate-float">Upload Image for Detection</h2>
                <div className="max-w-3xl mx-auto">
                    <div className="border border-white/10 rounded-xl p-12 text-center bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all duration-300 grid-animate">
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
                                <div className="space-y-6">
                                    <div className="relative">
                                        <img
                                            src={selectedImage}
                                            alt="Uploaded"
                                            className="max-h-96 mx-auto rounded-xl shadow-2xl neon-border"
                                        />
                                        {isLoading && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-xl">
                                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                                            </div>
                                        )}
                                    </div>
                                    {error && (
                                        <div className="p-4 bg-red-900/50 rounded-lg">
                                            <p className="text-red-400">{error}</p>
                                        </div>
                                    )}
                                    {detectionResult && !isLoading && (
                                        <div className="mt-6 p-6 bg-black/50 backdrop-blur-sm rounded-xl shadow-lg neon-border">
                                            <h3 className="text-xl font-semibold text-white mb-4">Detection Results</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {detectionResult.details.map((detail, index) => (
                                                    <div key={index} className="p-4 bg-gradient-to-br from-gray-900 to-black rounded-lg">
                                                        <p className="text-sm text-gray-400">{detail.label}</p>
                                                        <p className="text-lg font-semibold text-white">{detail.value}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-4 p-4 bg-gradient-to-r from-emerald-900/50 to-teal-900/50 rounded-lg">
                                                <p className="text-emerald-400">{detectionResult.changes}</p>
                                                <p className="text-sm text-emerald-300 mt-2">
                                                    Confidence: {(detectionResult.confidence * 100).toFixed(2)}%
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="mx-auto w-24 h-24 bg-gradient-to-br from-gray-900 to-black rounded-full flex items-center justify-center animate-pulse">
                                        <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xl text-white font-medium">Drag and drop your image here</p>
                                        <p className="text-gray-400 mt-2">or click to browse files</p>
                                    </div>
                                    <p className="text-sm text-gray-500">Supports PNG, JPG, GIF up to 10MB</p>
                                </div>
                            )}
                        </label>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Detection; 