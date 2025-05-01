import React from 'react';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <img src={process.env.PUBLIC_URL + '/logo.svg'} alt="Logo" className="h-8 w-auto" />
              <span className="ml-2 text-xl font-semibold text-blue-600">Hydrology AI</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#overview" className="text-gray-600 hover:text-blue-600">Overview</a>
              <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
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
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
            Get Started
          </button>
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
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
            Contact Us
          </button>
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
