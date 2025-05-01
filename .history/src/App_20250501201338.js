import React, { useState, useEffect } from 'react';
import './App.css';
import Detection from './components/Detection';

function App() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md shadow-soft z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-2">
              <svg className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xl font-bold gradient-text">Hydrology AI</span>
            </div>
            <div className="flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-all">Features</a>
              <a href="#detect" className="text-gray-600 hover:text-blue-600 transition-all">Detect</a>
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
          <div className="flex justify-center space-x-4">
            <a href="#detect" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg hover-lift shadow-hard transition-all">
              Try Detection
            </a>
            <a href="#features" className="bg-white text-blue-600 px-8 py-3 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-all">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Detection Section */}
      <Detection />

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Real-time Analysis',
                description: 'Instant processing of satellite imagery for immediate insights',
                icon: '⚡'
              },
              {
                title: 'High Accuracy',
                description: 'State-of-the-art ML models for precise change detection',
                icon: '🎯'
              },
              {
                title: 'User-Friendly',
                description: 'Intuitive interface for easy data visualization',
                icon: '✨'
              }
            ].map((feature, index) => (
              <div key={index} className="p-8 glass rounded-xl hover-lift transition-all">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'React', icon: '⚛️' },
              { name: 'TensorFlow', icon: '🤖' },
              { name: 'Python', icon: '🐍' },
              { name: 'AWS', icon: '☁️' }
            ].map((tech, index) => (
              <div key={index} className="text-center p-6 glass rounded-xl hover-lift">
                <div className="text-4xl mb-4">{tech.icon}</div>
                <p className="text-xl font-semibold">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8 gradient-text">Get in Touch</h2>
          <a
            href="mailto:contact@example.com"
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg hover-lift shadow-hard transition-all"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Hydrological Change Detection System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
