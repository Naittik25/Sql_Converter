import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import {
  FiUser,
  FiMail,
  FiSmartphone,
  FiKey,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import appLogo from "../assets/image.png";

export default function Register() {
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile_number, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          mobile_number,
          password: passwords.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        alert("OTP sent to your mobile number!");
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Connection error:", error);
      alert("Unable to connect to the server. Please try again later.");
    }
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

    return (
      hasUpperCase && hasLowerCase && hasNumbers && hasSpecial && isLongEnough
    );
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert(
        "Invalid email format! Email must start with a character/number, followed by @, characters, and a dot.",
      );
      return;
    }

    if (passwords.password !== passwords.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!validatePassword(passwords.password)) {
      alert(
        "Password must contain at least 8 characters, including one uppercase, one lowercase, one number, and one special character.",
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          mobile_number: mobile_number,
          otp: otp,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Registration successful! Please log in.");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
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
            <input 
                type="text" 
                placeholder="Full Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required />
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
            <input 
                type="tel" 
                placeholder="Mobile Number" 
                value={mobile_number}
                onChange={(e) => setMobileNumber(e.target.value)}
                required />
            <button
              className={`register-otp-btn ${otpSent ? "sent" : ""}`}
              onClick={handleSendOtp}
              type="button"
            >
              {otpSent ? "Sent!" : "Get OTP"}
            </button>
          </div>

          {otpSent && (
            <div className="register-input-group register-animate-slide">
              <FiKey className="register-input-icon" />
              <input 
                type="text" 
                placeholder="Enter 6-digit OTP" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required />
            </div>
          )}

          {/* PASSWORD FIELD WITH SHOW/HIDE */}
          <div className="register-input-group">
            <FiLock className="register-input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create Password"
              value={passwords.password}
              onChange={(e) =>
                setPasswords({ ...passwords, password: e.target.value })
              }
              required
            />
            <div
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
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
              onChange={(e) =>
                setPasswords({ ...passwords, confirmPassword: e.target.value })
              }
              required
            />
            <div
              className="password-toggle-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>

          <button type="submit" className="register-submit-btn">
            Create Account
          </button>
        </form>

        <div className="register-footer-link">
          Already have an account? <Link to="/login">Log in here</Link>
        </div>
      </div>
    </div>
  );
}
