import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Coffee,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowLeft,
  User,
} from "lucide-react";

const SignIn = ({ onBack, onForgotPassword, onCreateAccount }) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // ================= VALIDATION =================
  const validateForm = () => {
    const newErrors = {};

    if (!username) {
      newErrors.username = "Username is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ================= LOGIN =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:8001/login", {
        username,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("adminToken", "admin_authenticated");
        localStorage.setItem("userRole", res.data.user.role);

        setLoginError("");
        navigate("/admin");
      } else {
        setLoginError("Invalid username or password");
      }
    } catch (error) {
      console.log(error);
      setLoginError("Server error");
    }

    setIsLoading(false);
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

            {/* USERNAME */}
            <div className="form-group">
              <label>Username</label>
              <div className="input-wrapper">
                <User size={18} />
                <input
                  type="text"
                  value={username}
                  placeholder="Enter username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {errors.username && <p>{errors.username}</p>}
            </div>

            {/* PASSWORD */}
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

            {/* FORGOT PASSWORD */}
            <div className="forgot-row">
              <button type="button" onClick={onForgotPassword}>
                Forgot Password?
              </button>
            </div>

            {/* SUBMIT */}
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