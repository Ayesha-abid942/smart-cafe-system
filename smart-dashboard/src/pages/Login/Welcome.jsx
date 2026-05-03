import React from 'react';
import { Coffee, ArrowRight } from 'lucide-react';

interface WelcomeProps {
  onGetStarted: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onGetStarted }) => {
  return (
    <div className="welcome-container">
      {/* LEFT SIDE - IMAGE */}
      <div className="welcome-left">
        <img src="https://i.pinimg.com/736x/1c/a9/6d/1ca96d1095555fdd2670e6018002bab9.jpg" alt="Smart Cafe" className="welcome-image" />
        <div className="welcome-overlay">
          <div className="welcome-overlay-content">
            <Coffee size={40} className="welcome-overlay-icon" />
            <h2 className="welcome-overlay-title">Smart Cafe</h2>
            <p className="welcome-overlay-text">
              Premium coffee experience at your fingertips
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - WELCOME CONTENT */}
      <div className="welcome-right">
        <div className="welcome-content">
          {/* Logo */}
          <div className="welcome-logo">
            <Coffee size={48} />
          </div>

          {/* Heading */}
          <h1 className="welcome-heading">
            Welcome to
            <br />
            <span className="welcome-brand">Smart Cafe</span>
          </h1>

          <p className="welcome-description">
            Your one-stop solution for managing orders, menu, and customer experience.
            Streamline your cafe operations with our powerful admin dashboard.
          </p>

          {/* Features */}
          <div className="welcome-features">
            <div className="welcome-feature-item">
              <div className="welcome-feature-dot"></div>
              <span>Manage orders efficiently</span>
            </div>
            <div className="welcome-feature-item">
              <div className="welcome-feature-dot"></div>
              <span>Track real-time analytics</span>
            </div>
            <div className="welcome-feature-item">
              <div className="welcome-feature-dot"></div>
              <span>Update menu instantly</span>
            </div>
          </div>

          {/* Login Button */}
          <button
            className="welcome-login-btn"
            onClick={onGetStarted}
          >
            <span>Login to Admin Panel</span>
            <ArrowRight size={20} />
          </button>

          {/* Footer */}
          <p className="welcome-footer">
            © 2024 Smart Cafe. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;