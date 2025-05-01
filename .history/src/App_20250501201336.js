import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isUploading, setIsUploading] = useState(false);
  const [sections, setSections] = useState([]);

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

  useEffect(() => {
    // Add intersection observer for section animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    setSections(sections);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
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

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUploading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md shadow-soft z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
            </div>
            <div className="flex items-center space-x-4">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-all">Features</a>
              <a href="#technologies" className="text-gray-600 hover:text-blue-600 transition-all">Technologies</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-all">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text mb-6">
            AI-Powered Hydrological Change Detection
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Advanced machine learning for precise water body monitoring and analysis
          </p>
          <div className="flex justify-center">
            <label className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-lg hover-lift shadow-hard">
              {isUploading ? (
                <div className="flex items-center">
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Processing...
                </div>
              ) : (
                'Upload Image for Detection'
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Real-time Analysis',
                description: 'Instant processing of satellite imagery for immediate insights'
              },
              {
                title: 'High Accuracy',
                description: 'State-of-the-art ML models for precise change detection'
              },
              {
                title: 'User-Friendly',
                description: 'Intuitive interface for easy data visualization'
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 glass rounded-xl hover-lift transition-all">
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['React', 'TensorFlow', 'Python', 'AWS'].map((tech, index) => (
              <div key={index} className="text-center p-6 glass rounded-xl hover-lift">
                <p className="text-xl font-semibold">{tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8 gradient-text">Get in Touch</h2>
          <a
            href="mailto:contact@example.com"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover-lift shadow-hard transition-all"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Hydrological Change Detection System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
