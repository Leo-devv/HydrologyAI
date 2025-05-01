import React from 'react';
import './App.css';
import Detection from './components/Detection';

function App() {
  return (
    <div className="app">
      <header className="site-header">
        <div className="container flex items-center justify-between py-6">
          <div className="logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#1a73e8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#1a73e8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <h1>HydroScan</h1>
          </div>
          <nav className="main-nav">
            <ul className="flex gap-8">
              <li><a href="#hero" className="nav-link">Home</a></li>
              <li><a href="#features" className="nav-link">Features</a></li>
              <li><a href="#detect" className="nav-link">Detection</a></li>
              <li><a href="#about" className="nav-link">About</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section id="hero" className="hero-section">
          <div className="container flex items-center">
            <div className="hero-content">
              <h1 className="hero-title">Advanced Hydrological Change Detection</h1>
              <p className="hero-subtitle">
                Leverage the power of AI to detect and monitor changes in water bodies from satellite imagery.
                Our cutting-edge technology helps environmental scientists, researchers, and policymakers make
                informed decisions.
              </p>
              <div className="hero-actions">
                <a href="#detect" className="btn btn-primary">Try Detection</a>
                <a href="#features" className="btn btn-outline">Learn More</a>
              </div>
            </div>
            <div className="hero-image">
              <div className="image-container">
                <div className="animated-background"></div>
                <img src="/assets/satellite-view.jpg" alt="Satellite view of water bodies" className="floating-image" />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="features-section">
          <div className="container">
            <div className="section-header text-center">
              <h2>Powerful Detection Features</h2>
              <div className="accent-line mx-auto"></div>
              <p className="section-subtitle">
                Our system combines advanced computer vision with machine learning to provide accurate hydrological analysis
              </p>
            </div>

            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"></path>
                    <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <h3>Real-time Analysis</h3>
                <p>Process satellite imagery quickly and get detailed results in seconds</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <h3>High Accuracy</h3>
                <p>Our AI models are trained on thousands of satellite images for precise detection</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 20L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M5 13L12 20L19 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <h3>Change Tracking</h3>
                <p>Monitor water body changes over time with historical data analysis</p>
              </div>
            </div>
          </div>
        </section>

        <Detection />

        <section id="about" className="about-section">
          <div className="container">
            <div className="section-header text-center">
              <h2>About Our Technology</h2>
              <div className="accent-line mx-auto"></div>
              <p className="section-subtitle">
                Built with cutting-edge AI and machine learning algorithms to deliver accurate hydrological analysis
              </p>
            </div>

            <div className="about-content flex gap-8">
              <div className="about-text">
                <h3>How It Works</h3>
                <p>
                  HydroScan uses a combination of computer vision algorithms and specialized neural networks to
                  identify water bodies in satellite imagery. Our technology can detect changes in water area,
                  quality, and surrounding vegetation.
                </p>
                <p>
                  The system has been trained on thousands of satellite images from various sources, making it
                  highly accurate in different environmental conditions and geographical locations.
                </p>
                <div className="tech-stack">
                  <h4>Technologies Used:</h4>
                  <ul className="tech-list">
                    <li>Computer Vision</li>
                    <li>Convolutional Neural Networks</li>
                    <li>Time Series Analysis</li>
                    <li>Geospatial Processing</li>
                  </ul>
                </div>
              </div>
              <div className="about-image">
                <div className="image-container glass">
                  <img src="/assets/tech-illustration.jpg" alt="AI technology illustration" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h3>HydroScan</h3>
              <p>Advanced Hydrological Analysis</p>
            </div>
            <div className="footer-links">
              <div className="footer-links-column">
                <h4>Navigation</h4>
                <ul>
                  <li><a href="#hero">Home</a></li>
                  <li><a href="#features">Features</a></li>
                  <li><a href="#detect">Detection</a></li>
                  <li><a href="#about">About</a></li>
                </ul>
              </div>
              <div className="footer-links-column">
                <h4>Contact</h4>
                <ul>
                  <li><a href="mailto:info@hydroscan.tech">info@hydroscan.tech</a></li>
                  <li><a href="tel:+15551234567">+1 (555) 123-4567</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} HydroScan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
