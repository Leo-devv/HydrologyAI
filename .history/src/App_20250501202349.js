import React, { useEffect } from 'react';
import Detection from './components/Detection';
import './App.css';

function App() {
  // Handle section visibility animations
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

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="app">
      {/* Header */}
      <header className="site-header">
        <div className="container flex items-center justify-between py-6">
          <div className="logo">
            <div className="logo-icon"></div>
            <h1>HydroVision</h1>
          </div>
          <nav className="main-nav">
            <ul className="flex gap-8">
              <li><a href="#home" className="nav-link">Home</a></li>
              <li><a href="#detect" className="nav-link">Detection</a></li>
              <li><a href="#about" className="nav-link">About</a></li>
              <li><a href="#contact" className="nav-link">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="container flex items-center">
          <div className="hero-content">
            <h2 className="hero-title">AI-Powered Hydrological Change Detection</h2>
            <p className="hero-subtitle">Advanced satellite image analysis for water body monitoring and change detection using cutting-edge AI technology</p>
            <div className="hero-actions">
              <a href="#detect" className="btn btn-primary">Try Detection</a>
              <a href="#about" className="btn btn-outline">Learn More</a>
            </div>
          </div>
          <div className="hero-image halo">
            <div className="image-container">
              <div className="animated-background"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Detection Section */}
      <Detection />

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>How It Works</h2>
            <div className="accent-line mx-auto"></div>
            <p className="section-subtitle">Our advanced AI system analyzes satellite imagery to detect and monitor water bodies</p>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" className="icon">
                  <path d="M14.7519 4.74792L15.2374 4.26236C16.4051 3.09461 18.3091 3.09461 19.4769 4.26236C20.6446 5.43011 20.6446 7.33401 19.4769 8.50176L18.9913 8.98731M14.7519 4.74792L4.74792 14.7519C4.45281 15.047 4.25 15.4346 4.25 15.8516L4.25 19.25C4.25 19.6642 4.58579 20 5 20L8.39844 20C8.81536 20 9.20297 19.7972 9.49807 19.5021L19.5021 9.49807M14.7519 4.74792L19.5021 9.49807M18.9913 8.98731L19.5021 9.49807M18.9913 8.98731L9.49807 18.4806" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Image Processing</h3>
              <p>High-resolution satellite imagery is processed through advanced computer vision algorithms</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" className="icon">
                  <path d="M15.75 9V5.25C15.75 4.00736 14.7426 3 13.5 3L7.5 3C6.25736 3 5.25 4.00736 5.25 5.25L5.25 18.75C5.25 19.9926 6.25736 21 7.5 21H13.5C14.7426 21 15.75 19.9926 15.75 18.75V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.75 15L21.75 12L18.75 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21.75 12L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>AI Detection</h3>
              <p>Our neural network model identifies water bodies and analyzes their boundaries with high precision</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" className="icon">
                  <path d="M3 13.125C3 18.059 7.05964 22 12.1398 22C14.1869 22 16.1031 21.3651 17.6397 20.2498C18.1587 19.8614 18.4656 19.2442 18.4656 18.6021C18.4656 17.7858 17.8332 17.1207 17.0169 17.1207C16.6616 17.1207 16.3243 17.2372 16.0547 17.4383C14.9022 18.2839 13.551 18.7724 12.1398 18.7724C8.83088 18.7724 6.22764 16.2578 6.22764 13.125C6.22764 9.99219 8.83088 7.47763 12.1398 7.47763C13.551 7.47763 14.9022 7.96612 16.0547 8.81172C16.3243 9.01284 16.6616 9.12927 17.0169 9.12927C17.8332 9.12927 18.4656 8.46421 18.4656 7.64788C18.4656 7.00582 18.1587 6.38861 17.6397 6.00022C16.1031 4.88489 14.1869 4.25 12.1398 4.25C7.05964 4.25 3 8.19095 3 13.125Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 13.125L21 13.1361" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.6429 13.125L16.6429 13.1361" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Change Detection</h3>
              <p>Compare historical data to detect changes in water levels, boundaries, and quality over time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Get In Touch</h2>
            <div className="accent-line mx-auto"></div>
            <p className="section-subtitle">Interested in our technology? Contact us for more information</p>
          </div>

          <div className="contact-form-container">
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" className="input-field" placeholder="Your name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" className="input-field" placeholder="Your email" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" className="input-field" rows="4" placeholder="Your message"></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h3>HydroVision</h3>
              <p>AI-Powered Hydrological Analysis</p>
            </div>
            <div className="footer-links">
              <div className="footer-links-column">
                <h4>Navigation</h4>
                <ul>
                  <li><a href="#home">Home</a></li>
                  <li><a href="#detect">Detection</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>
              <div className="footer-links-column">
                <h4>Resources</h4>
                <ul>
                  <li><a href="#api">API</a></li>
                  <li><a href="#documentation">Documentation</a></li>
                  <li><a href="#faq">FAQ</a></li>
                  <li><a href="#support">Support</a></li>
                </ul>
              </div>
              <div className="footer-links-column">
                <h4>Legal</h4>
                <ul>
                  <li><a href="#terms">Terms</a></li>
                  <li><a href="#privacy">Privacy</a></li>
                  <li><a href="#cookies">Cookies</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2023 HydroVision. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
