import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';
import { FiUser, FiMail, FiSmartphone, FiLogOut, FiEdit2, FiBriefcase, FiCheck, FiX, FiAlertTriangle } from "react-icons/fi";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userData, setUserData] = useState({
    name: "Naitik Patel",
    email: "naitikpatel1205@gmail.com",
    mobile: "+91 98765 43210",
    role: "Data Engineering Specialist",
    batch: "2025-26 Batch"
  });

  const confirmLogout = () => {
    window.location.href = '/login';
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className="profile-main-wrapper">
      
      {/* --- HEADER BLOCK --- */}
      <div className="profile-header-premium">
        <div className="profile-id-section">
          <div className="profile-letter-avatar">{userData.name.charAt(0)}</div>
          <div className="profile-name-stack">
            <h1>{userData.name}</h1>
            <span className="profile-tagline">{userData.role}</span>
          </div>
        </div>
        
        <div className="profile-header-actions">
          {/* {!isEditing ? (
            <button className="btn-modern edit-btn" onClick={() => setIsEditing(true)}>
              <FiEdit2 /> Edit Profile
            </button>
          ) : (
            <button className="btn-modern cancel-btn" onClick={() => setIsEditing(false)}>
              <FiX /> Cancel
            </button>
          )} */}
          <button className="btn-modern logout-trigger-btn" onClick={() => setShowLogoutModal(true)}>
            <FiLogOut /> Logout
          </button>
        </div>
      </div>

      <div className="profile-body-content">
        {!isEditing ? (
          /* --- UNIQUE LIST VIEW --- */
          <div className="profile-info-stack animate-fade-in">
            <div className="info-item-linear">
              <div className="info-icon-circle"><FiUser /></div>
              <div className="info-text-group">
                <label>Full Identity</label>
                <p>{userData.name}</p>
              </div>
            </div>

            <div className="info-item-linear">
              <div className="info-icon-circle"><FiMail /></div>
              <div className="info-text-group">
                <label>Registered Email</label>
                <p>{userData.email}</p>
              </div>
            </div>

            <div className="info-item-linear">
              <div className="info-icon-circle"><FiSmartphone /></div>
              <div className="info-text-group">
                <label>Mobile Contact</label>
                <p>{userData.mobile}</p>
              </div>
            </div>

            <div className="info-item-linear">
              <div className="info-icon-circle"><FiBriefcase /></div>
              <div className="info-text-group">
                <label>Current Assignment</label>
                <p>{userData.role} • {userData.batch}</p>
              </div>
            </div>
          </div>
        ) : (
          
          <form className="profile-form-linear animate-slide-up" onSubmit={handleSave}>
            <div className="input-row-modern">
              <label>Full Name</label>
              <input type="text" value={userData.name} onChange={(e) => setUserData({...userData, name: e.target.value})} />
            </div>
            <div className="input-row-modern">
              <label>Email Address</label>
              <input type="email" value={userData.email} onChange={(e) => setUserData({...userData, email: e.target.value})} />
            </div>
            <div className="input-row-modern">
              <label>Mobile</label>
              <input type="text" value={userData.mobile} onChange={(e) => setUserData({...userData, mobile: e.target.value})} />
            </div>
            <button type="submit" className="save-submit-btn"><FiCheck /> Apply Changes</button>
          </form>
        )}
      </div>

      {/* --- LOGOUT CONFIRMATION POP-UP (MODAL) --- */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="logout-modal-card">
            <div className="modal-warning-icon"><FiAlertTriangle /></div>
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to end your current session? You will need to login again to access your workspace.</p>
            <div className="modal-btn-group">
              <button className="modal-btn confirm" onClick={confirmLogout}>Yes, Logout</button>
              <button className="modal-btn stay" onClick={() => setShowLogoutModal(false)}>Keep me here</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}