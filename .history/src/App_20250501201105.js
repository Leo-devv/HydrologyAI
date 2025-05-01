import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'detect', 'overview', 'technologies', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop &&
          scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        // Simulate API call
        setTimeout(() => {
          setDetectionResult({
            waterBody: true,
            confidence: 0.95,
            changes: "Detected water body with 95% confidence",
            details: [
              { label: "Water Surface Area", value: "2.5 km²" },
              { label: "Change Rate", value: "+15% since last month" },
              { label: "Water Quality", value: "Good" }
            ]
          });
          setIsLoading(false);
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-2">
              <svg className="h-10 w-10 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Hydrology AI
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              {['home', 'detect', 'overview', 'technologies', 'contact'].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className={`text-sm font-medium transition-colors duration-200 ${activeSection === section
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                    }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              AI-Powered
            </span>
            <br />
            Hydrological Change Detection
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Leveraging cutting-edge artificial intelligence to analyze satellite imagery and detect hydrological changes for better environmental management and climate resilience.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#detect" className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition duration-300 inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Try Detection
            </a>
            <a href="#overview" className="bg-white text-blue-600 px-8 py-4 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition duration-300 inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Detection Section */}
      <section id="detect" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Upload Image for Detection</h2>
          <div className="max-w-3xl mx-auto">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center bg-gray-50 hover:bg-gray-100 transition duration-300">
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
                        className="max-h-96 mx-auto rounded-xl shadow-2xl"
                      />
                      {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                        </div>
                      )}
                    </div>
                    {detectionResult && !isLoading && (
                      <div className="mt-6 p-6 bg-white rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold text-blue-800 mb-4">Detection Results</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {detectionResult.details.map((detail, index) => (
                            <div key={index} className="p-4 bg-blue-50 rounded-lg">
                              <p className="text-sm text-gray-600">{detail.label}</p>
                              <p className="text-lg font-semibold text-blue-800">{detail.value}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 p-4 bg-green-50 rounded-lg">
                          <p className="text-green-800">{detectionResult.changes}</p>
                          <p className="text-sm text-green-600 mt-2">
                            Confidence: {(detectionResult.confidence * 100).toFixed(2)}%
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xl text-gray-700 font-medium">Drag and drop your image here</p>
                      <p className="text-gray-500 mt-2">or click to browse files</p>
                    </div>
                    <p className="text-sm text-gray-400">Supports PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Why This Matters</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Climate Change Impact",
                description: "Early detection of water body changes helps in managing climate change impacts and preserving ecosystems.",
                icon: "🌍"
              },
              {
                title: "Automated Monitoring",
                description: "Replace manual surveys with AI-powered automated monitoring for faster and more accurate results.",
                icon: "🤖"
              },
              {
                title: "Resource Management",
                description: "Enable better decision-making for governments and environmental agencies in water resource management.",
                icon: "💧"
              }
            ].map((item, index) => (
              <div key={index} className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Technologies We Use</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: "🤖", title: "Machine Learning", subtitle: "CNN + LSTM" },
              { icon: "👁️", title: "Computer Vision", subtitle: "U-Net & Watershed" },
              { icon: "🛰️", title: "Satellite Data", subtitle: "NASA Earthdata" },
              { icon: "☁️", title: "Cloud Services", subtitle: "AWS/Azure/GCP" }
            ].map((tech, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition duration-300">
                <div className="text-5xl mb-4">{tech.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{tech.title}</h3>
                <p className="text-sm text-gray-600">{tech.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Interested in learning more about our hydrological change detection system?
            We'd love to hear from you.
          </p>
          <a
            href="mailto:leooo.dev@gmail.com"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <svg className="h-8 w-8 text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-xl font-bold text-blue-400">Hydrology AI</span>
              </div>
              <p className="text-gray-400">Advanced AI solutions for hydrological monitoring and analysis.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['home', 'detect', 'overview', 'technologies', 'contact'].map((link) => (
                  <li key={link}>
                    <a href={`#${link}`} className="text-gray-400 hover:text-white transition duration-200">
                      {link.charAt(0).toUpperCase() + link.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">
                <a href="mailto:leooo.dev@gmail.com" className="hover:text-white transition duration-200">
                  leooo.dev@gmail.com
                </a>
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Hydrology AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
