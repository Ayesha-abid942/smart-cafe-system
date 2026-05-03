import React, { useState, type FormEvent } from 'react';
import { Coffee, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';

interface SignInProps {
  onBack: () => void;
  onForgotPassword: () => void;
  onCreateAccount: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onBack, onForgotPassword, onCreateAccount }) => {
  const [showPassword, setShowPassword] = useState < boolean > (false);
  const [email, setEmail] = useState < string > ('');
  const [password, setPassword] = useState < string > ('');
  const [loginError, setLoginError] = useState < string > ('');
  const [isLoading, setIsLoading] = useState < boolean > (false);
  const [errors, setErrors] = useState < { email?: string; password?: string } > ({});

  const ADMIN_CREDENTIALS = {
    email: 'admin@smartcafe.com',
    password: 'Admin123'
  };

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem('adminToken', 'admin_authenticated');
        localStorage.setItem('userRole', 'admin');
        setLoginError('');
        alert('✅ Welcome Admin! Redirecting to dashboard...');
        // window.location.href = '/admin/dashboard';
      } else {
        setLoginError('Invalid email or password. Please try again.');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="login-container">
      {/* LEFT SIDE - IMAGE */}
      <div className="login-left">
        <img src="https://images.stockcake.com/public/6/1/0/610ff36e-8ac0-46e1-b37e-2db8ca0a50ba_large/coffee-splash-art-stockcake.jpg" alt="Smart Cafe" className="login-left-image" />
        <div className="login-left-overlay">
          <Coffee size={32} className="login-left-icon" />
          <h2 className="login-left-brand">Smart Cafe</h2>
        </div>
      </div>

      {/* RIGHT SIDE - SIGN IN FORM */}
      <div className="login-right">
        <div className="login-form-wrapper">
          {/* Back Button */}
          <button className="back-button" onClick={onBack}>
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          {/* Header */}
          <div className="login-header">
            <div className="login-header-icon">
              <Coffee size={28} />
            </div>
            <h2 className="login-title">Sign In</h2>
            <p className="login-subtitle">Welcome back! Please enter your credentials.</p>
          </div>

          {/* Error Alert */}
          {loginError && (
            <div className="login-error-alert">
              <AlertCircle size={18} />
              <span>{loginError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                    if (loginError) setLoginError('');
                  }}
                  placeholder="admin@smartcafe.com"
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                />
              </div>
              {errors.email && (
                <p className="field-error"><AlertCircle size={13} /> {errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                    if (loginError) setLoginError('');
                  }}
                  placeholder="Enter your password"
                  className={`form-input ${errors.password ? 'input-error' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-password"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="field-error"><AlertCircle size={13} /> {errors.password}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="forgot-row">
              <button
                type="button"
                className="forgot-link"
                onClick={onForgotPassword}
              >
                Forgot Password?
              </button>
            </div>
            {/* Submit Button */}
            <button type="submit" disabled={isLoading} className="submit-btn">
              {isLoading ? (
                <span className="loading-text">
                  <svg className="spinner" viewBox="0 0 24 24">
                    <circle className="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="spinner-head" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                <span className="btn-content">Sign In</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="form-divider">
            <span className="divider-line"></span>
            <span className="divider-text">or</span>
            <span className="divider-line"></span>
          </div>

          {/* Create Account Link */}
          <div className="switch-page-box">
            <span className="switch-page-text">Don't have an account?</span>
            <button className="switch-page-btn" onClick={onCreateAccount}>
              Create Account
            </button>
          </div>

          {/* Footer */}
          <p className="login-footer">© 2024 Smart Cafe. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;