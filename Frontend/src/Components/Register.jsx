import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Register.css'; 
import { FiUser, FiMail, FiSmartphone, FiKey, FiLock, FiEye, FiEyeOff } from "react-icons/fi"; // Added Eye icons
import appLogo from '../assets/image.png';

export default function Register() {
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // NEW: Toggle state
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // NEW: Toggle state
  
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: ""
  });
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = (e) => {
    e.preventDefault();
    setOtpSent(true);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+/;
    return emailRegex.test(email);
  };

  const validatePassword = (pw) => {
    const hasUpperCase = /[A-Z]/.test(pw);
    const hasLowerCase = /[a-z]/.test(pw);
    const hasNumbers = /\d/.test(pw);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pw);
    const isLongEnough = pw.length >= 8;

    return hasUpperCase && hasLowerCase && hasNumbers && hasSpecial && isLongEnough;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert("Invalid email format! Email must start with a character/number, followed by @, characters, and a dot.");
      return;
    }

    if (passwords.password !== passwords.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!validatePassword(passwords.password)) {
      alert("Password must contain at least 8 characters, including one uppercase, one lowercase, one number, and one special character.");
      return;
    }

    navigate('/login');
  };

  return (
    <div className="register-page-wrapper">
      <div className="register-card">
        
        <div className="register-header">
          <img src={appLogo} alt="Flytics Logo" className="register-logo" />
          <h2>Create an Account</h2>
          <p>Join Flytics to modernize your data pipelines.</p>
        </div>

        <form className="register-form" onSubmit={handleRegister}>
          <div className="register-input-group">
            <FiUser className="register-input-icon" />
            <input type="text" placeholder="Full Name" required />
          </div>

          <div className="register-input-group">
            <FiMail className="register-input-icon" />
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="register-input-group register-otp-group">
            <FiSmartphone className="register-input-icon" />
            <input type="tel" placeholder="Mobile Number" required />
            <button 
              className={`register-otp-btn ${otpSent ? 'sent' : ''}`} 
              onClick={handleSendOtp}
              type="button" 
            >
              {otpSent ? "Sent!" : "Get OTP"}
            </button>
          </div>

          {otpSent && (
            <div className="register-input-group register-animate-slide">
              <FiKey className="register-input-icon" />
              <input type="text" placeholder="Enter 6-digit OTP" required />
            </div>
          )}

          {/* PASSWORD FIELD WITH SHOW/HIDE */}
          <div className="register-input-group">
            <FiLock className="register-input-icon" />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Create Password" 
              value={passwords.password}
              onChange={(e) => setPasswords({...passwords, password: e.target.value})}
              required 
            />
            <div className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>

          {/* CONFIRM PASSWORD FIELD WITH SHOW/HIDE */}
          <div className="register-input-group">
            <FiLock className="register-input-icon" />
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              placeholder="Confirm Password" 
              value={passwords.confirmPassword}
              onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
              required 
            />
            <div className="password-toggle-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>

          <button type="submit" className="register-submit-btn">Create Account</button>
        </form>

        <div className="register-footer-link">
          Already have an account? <Link to="/login">Log in here</Link>
        </div>

      </div>
    </div>
  );
}