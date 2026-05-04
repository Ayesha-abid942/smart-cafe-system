import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Coffee,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";


const SignIn = ({
  onBack,
  onForgotPassword,
  onCreateAccount,
}) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const savedEmail =
    localStorage.getItem("newAdminEmail") || "admin@smartcafe.com";
  const savedPassword =
    localStorage.getItem("newAdminPassword") || "Admin123";


  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      if (
        email === savedEmail &&
        password === savedPassword
      ) {
        localStorage.setItem("adminToken", "admin_authenticated");
        localStorage.setItem("userRole", "admin");
        setLoginError("");

        // Redirect to admin dashboard
        navigate("/admin");
      } else {
        setLoginError("Invalid email or password");
      }

      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img
          src="https://images.stockcake.com/public/6/1/0/610ff36e-8ac0-46e1-b37e-2db8ca0a50ba_large/coffee-splash-art-stockcake.jpg"
          alt="Smart Cafe"
          className="login-left-image"
        />
        <div className="login-left-overlay">
          <Coffee size={32} />
          <h2>Smart Cafe</h2>
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-wrapper">
          <button className="back-button" onClick={onBack}>
            <ArrowLeft size={20} />
            Back
          </button>

          <div className="login-header">
            <Coffee size={28} />
            <h2>Sign In</h2>
            <p>Enter admin credentials</p>
          </div>

          {loginError && (
            <div className="login-error-alert">
              <AlertCircle size={18} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            {/* Email */}
            <div className="form-group">
              <label>Email</label>
              <div className="input-wrapper">
                <Mail size={18} />
                <input
                  type="email"
                  value={email}
                  placeholder="admin@smartcafe.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && <p>{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p>{errors.password}</p>}
            </div>

            <div className="forgot-row">
              <button type="button" onClick={onForgotPassword}>
                Forgot Password?
              </button>
            </div>

            <button type="submit" disabled={isLoading} className="submit-btn">
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="switch-page-box">
            <span>Don't have account?</span>
            <button onClick={onCreateAccount}>Create Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;