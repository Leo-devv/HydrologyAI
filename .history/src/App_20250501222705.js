import React, { useState } from 'react';
import './App.css';
import Detection from './components/Detection';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <h1>HydroScan</h1>
          </div>

          <nav className="main-nav">
            <ul>
              <li className={activeTab === 'dashboard' ? 'active' : ''}>
                <button onClick={() => setActiveTab('dashboard')}>
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="currentColor"></path>
                  </svg>
                  Dashboard
                </button>
              </li>
              <li className={activeTab === 'detect' ? 'active' : ''}>
                <button onClick={() => setActiveTab('detect')}>
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path d="M9 3L5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z" fill="currentColor"></path>
                  </svg>
                  Detect Changes
                </button>
              </li>
              <li className={activeTab === 'analytics' ? 'active' : ''}>
                <button onClick={() => setActiveTab('analytics')}>
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 15h-2V8h2v10zm-4 0H6v-4h2v4zm8 0h-2V8h2v10zm2-12h-2V4h2v2z" fill="currentColor"></path>
                  </svg>
                  Analytics
                </button>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <button className="theme-toggle" aria-label="Toggle theme">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zm-2 5.79V18h-3.52L12 20.48 9.52 18H6v-3.52L3.52 12 6 9.52V6h3.52L12 3.52 14.48 6H18v3.52L20.48 12 18 14.48zM12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="currentColor"></path>
              </svg>
            </button>
            <button className="user-profile" aria-label="User profile">
              <div className="avatar">US</div>
            </button>
          </div>
        </div>
      </header>

      <main className="main">
        {activeTab === 'dashboard' && (
          <section className="hero">
            <div className="hero-content">
              <h1>AI-Powered Water Change Detection</h1>
              <p>Advanced satellite imagery analysis for monitoring water bodies and detecting changes over time.</p>
              <button className="cta-button" onClick={() => setActiveTab('detect')}>
                Start Detection
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </section>
        )}

        {activeTab === 'detect' && <Detection />}

        {activeTab === 'analytics' && (
          <section className="analytics">
            <div className="section-content">
              <h2>Advanced Analytics</h2>
              <p>Comprehensive analytics and insights about water body changes over time.</p>
              <div className="analytics-placeholder">
                <svg viewBox="0 0 24 24" width="48" height="48">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" fill="currentColor" />
                  <path d="M7 12h2v5H7zm4-3h2v8h-2zm4-3h2v11h-2z" fill="currentColor" />
                </svg>
                <p>Coming Soon</p>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} HydroScan</p>
          <nav className="footer-nav">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default App;
