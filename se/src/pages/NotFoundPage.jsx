import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFoundPage.css';

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-graphic">
          <div className="error-code">404</div>
          <div className="error-illustration">
            <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M20,50 Q50,20 80,50 T140,50 T180,50" fill="none" stroke="#0066ff" strokeWidth="2"/>
              <circle cx="45" cy="50" r="15" fill="#f0f4f8" stroke="#0066ff" strokeWidth="2"/>
              <circle cx="135" cy="50" r="15" fill="#f0f4f8" stroke="#0066ff" strokeWidth="2"/>
              <path d="M80,70 Q100,90 120,70" fill="none" stroke="#0066ff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
        <h1>Page Not Found</h1>
        <p>Hmm, the page you're looking for seems to have gone missing in our collaboration universe.</p>
        
        <div className="action-buttons">
          <Link to="/" className="btn btn-primary">Return Home</Link>
          <Link to="/explore" className="btn btn-outline">Explore Projects</Link>
        </div>
        
        <div className="suggestion-box">
          <h3>Looking for something specific?</h3>
          <ul>
            <li><Link to="/explore">Discover active projects</Link></li>
            <li><Link to="/create-project">Start your own project</Link></li>
            <li><Link to="/login">Sign in to your account</Link></li>
            <li><Link to="/register">Create a new account</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;