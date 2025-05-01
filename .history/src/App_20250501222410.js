import React, { useState } from 'react';
import './App.css';
import Detection from './components/Detection';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="dashboard-app">
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#1a73e8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#1a73e8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <h1>HydroScan</h1>
            </div>

            <nav className="dashboard-nav">
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
                <li className={activeTab === 'history' ? 'active' : ''}>
                  <button onClick={() => setActiveTab('history')}>
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" fill="currentColor"></path>
                    </svg>
                    History
                  </button>
                </li>
              </ul>
            </nav>

            <div className="header-actions">
              <button className="theme-toggle">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zm-2 5.79V18h-3.52L12 20.48 9.52 18H6v-3.52L3.52 12 6 9.52V6h3.52L12 3.52 14.48 6H18v3.52L20.48 12 18 14.48zM12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="currentColor"></path>
                </svg>
              </button>
              <button className="user-profile">
                <div className="avatar">US</div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        {activeTab === 'dashboard' && (
          <div className="dashboard-overview">
            <div className="container">
              <div className="dashboard-header">
                <h1>AI-Powered Hydrological Change Detection Dashboard</h1>
                <p className="dashboard-description">
                  This interactive web app visualizes changes in water bodies using satellite imagery and AI. Compare before-and-after images, view detected changes, and analyze trends over time.
                </p>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon water-icon">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 18c-3.35 0-6-2.57-6-6.2 0-2.34 1.95-5.44 6-9.14 4.05 3.7 6 6.79 6 9.14 0 3.63-2.65 6.2-6 6.2zm-4.17-6c.37 0 .67.26.74.62.41 2.22 2.28 2.98 3.64 2.87.43-.02.79.32.79.75 0 .4-.32.73-.72.75-2.13.13-4.62-1.09-5.19-4.12-.08-.45.28-.87.74-.87z" fill="currentColor"></path>
                    </svg>
                  </div>
                  <div className="stat-content">
                    <div className="stat-value animated-value">126,584</div>
                    <div className="stat-label">Water Bodies Monitored</div>
                  </div>
                  <div className="stat-trend positive">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path d="M7 14l5-5 5 5H7z" fill="currentColor"></path>
                    </svg>
                    <span>5.3%</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon change-icon">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.17-5.24l-4.58 4.58L10 18l-4-4 1.42-1.41L10 15.17l2.17-2.17 1.41 1.41-1.58 1.58 2.58-2.58 2.59 2.58z" fill="currentColor"></path>
                    </svg>
                  </div>
                  <div className="stat-content">
                    <div className="stat-value animated-value">24,873</div>
                    <div className="stat-label">Changes Detected</div>
                  </div>
                  <div className="stat-trend negative">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path d="M7 10l5 5 5-5H7z" fill="currentColor"></path>
                    </svg>
                    <span>2.1%</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon accuracy-icon">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="currentColor"></path>
                    </svg>
                  </div>
                  <div className="stat-content">
                    <div className="stat-value animated-value">95.7%</div>
                    <div className="stat-label">Detection Accuracy</div>
                  </div>
                  <div className="stat-trend positive">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path d="M7 14l5-5 5 5H7z" fill="currentColor"></path>
                    </svg>
                    <span>1.2%</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon area-icon">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path d="M15 13h2v8H7v-8h2v6h6v-6M3 3h18v2H3M19 6H5v2h14M3 11h18v2h-2v-1H5v1H3" fill="currentColor"></path>
                    </svg>
                  </div>
                  <div className="stat-content">
                    <div className="stat-value animated-value">583,429</div>
                    <div className="stat-label">Total Area (km²)</div>
                  </div>
                  <div className="stat-trend neutral">
                    <span>0.0%</span>
                  </div>
                </div>
              </div>

              <div className="dashboard-widgets">
                <div className="widget large">
                  <div className="widget-header">
                    <h3>Water Body Change Map</h3>
                    <div className="widget-controls">
                      <select className="time-selector">
                        <option>Last Month</option>
                        <option>Last Quarter</option>
                        <option>Last Year</option>
                      </select>
                    </div>
                  </div>
                  <div className="widget-content">
                    <div className="visualization-placeholder map-visualization">
                      <div className="animated-map">
                        <div className="map-layer base-layer"></div>
                        <div className="map-layer water-layer"></div>
                        <div className="map-layer change-layer"></div>
                        <div className="map-marker" style={{ top: '40%', left: '30%' }}></div>
                        <div className="map-marker" style={{ top: '50%', left: '60%' }}></div>
                        <div className="map-marker" style={{ top: '30%', left: '70%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="widget">
                  <div className="widget-header">
                    <h3>Recent Detections</h3>
                    <div className="widget-controls">
                      <button className="refresh-btn">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                          <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" fill="currentColor"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="widget-content">
                    <ul className="detection-list">
                      <li className="detection-item">
                        <div className="detection-image increase"></div>
                        <div className="detection-details">
                          <div className="detection-title">Lake Victoria Region</div>
                          <div className="detection-meta">
                            <span className="detection-type increase">Water Increase</span>
                            <span className="detection-time">2 hours ago</span>
                          </div>
                        </div>
                      </li>
                      <li className="detection-item">
                        <div className="detection-image decrease"></div>
                        <div className="detection-details">
                          <div className="detection-title">Amazon Basin</div>
                          <div className="detection-meta">
                            <span className="detection-type decrease">Water Decrease</span>
                            <span className="detection-time">5 hours ago</span>
                          </div>
                        </div>
                      </li>
                      <li className="detection-item">
                        <div className="detection-image change"></div>
                        <div className="detection-details">
                          <div className="detection-title">Colorado River</div>
                          <div className="detection-meta">
                            <span className="detection-type change">Course Change</span>
                            <span className="detection-time">1 day ago</span>
                          </div>
                        </div>
                      </li>
                      <li className="detection-item">
                        <div className="detection-image increase"></div>
                        <div className="detection-details">
                          <div className="detection-title">Yangtze River Delta</div>
                          <div className="detection-meta">
                            <span className="detection-type increase">Water Increase</span>
                            <span className="detection-time">2 days ago</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="widget">
                  <div className="widget-header">
                    <h3>Change Analysis</h3>
                    <div className="widget-controls">
                      <div className="chart-toggle">
                        <button className="active">Monthly</button>
                        <button>Quarterly</button>
                      </div>
                    </div>
                  </div>
                  <div className="widget-content">
                    <div className="visualization-placeholder chart-visualization">
                      <div className="animated-chart">
                        <div className="chart-bar" style={{ height: '60%' }}></div>
                        <div className="chart-bar" style={{ height: '75%' }}></div>
                        <div className="chart-bar" style={{ height: '45%' }}></div>
                        <div className="chart-bar" style={{ height: '90%' }}></div>
                        <div className="chart-bar" style={{ height: '70%' }}></div>
                        <div className="chart-bar" style={{ height: '50%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'detect' && <Detection />}

        {activeTab === 'analytics' && (
          <div className="analytics-container">
            <div className="container">
              <h2 className="section-title">Advanced Analytics</h2>
              <p className="section-subtitle">Coming soon - explore comprehensive analytics on water body changes over time.</p>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="history-container">
            <div className="container">
              <h2 className="section-title">Detection History</h2>
              <p className="section-subtitle">Coming soon - review your previous detection results and track changes over time.</p>
            </div>
          </div>
        )}
      </main>

      <footer className="dashboard-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} HydroScan. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
