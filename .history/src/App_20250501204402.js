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
        </div>
      </header>

      <main>
        <Detection />
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} HydroScan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
