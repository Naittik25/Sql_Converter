import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { FiUser, FiMail, FiSmartphone, FiKey, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import appLogo from "../assets/image.png";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card">
        <div className="login-header">
          <img src={appLogo} alt="Flytics Logo" className="login-logo" />
          <h2>Welcome Back</h2>
          <p>Enter your credentials to access your workspace.</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-input-group">
            <FiMail className="login-input-icon" />
            <input type="text" placeholder="Email or Mobile Number" required />
          </div>

          <div className="login-input-group">
            <FiLock className="login-input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
            />
            <div
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>

          <div className="login-forgot-password">
            <a href="#forgot">Forgot Password?</a>
          </div>

          <button type="submit" className="login-submit-btn">
            Login to Workspace
          </button>
        </form>

        <div className="login-footer-link">
          Don't have an account? {/* USES REACT ROUTER LINK */}
          <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
}
