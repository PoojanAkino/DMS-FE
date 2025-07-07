// src/pages/AdminProfile.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from './AdminProfile.module.css';

export default function AdminProfile() {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const userName = localStorage.getItem("userName") || "N/A";
  const userEmail = localStorage.getItem("userEmail") || "N/A";
  const userRole = localStorage.getItem("role") || "N/A";

  const handleLogout = () => {
    if (isLoggingOut) return; // Prevent multiple clicks
    setIsLoggingOut(true);

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    toast.success("Logged out successfully!", {
      autoClose: 1500,
      onClose: () => navigate("/"),
    });
  };

  return (
    <div className={styles.adminProfile}>
      <ToastContainer position="top-right" autoClose={1500} />

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Admin Profile
          </h1>
          <p className={styles.subtitle}>Manage your profile information and account settings</p>
        </div>
      </div>

      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              <span className={styles.avatarText}>
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className={styles.userInfo}>
              <h2 className={styles.userName}>{userName}</h2>
              <div className={styles.roleTag}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="17,11 19,13 23,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{userRole}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.profileBody}>
          <div className={styles.sectionTitle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22S8 18 8 14V5L12 3L16 5V14C16 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Personal Information
          </div>

          <div className={styles.fieldsContainer}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Full Name
              </label>
              <div className={styles.fieldValue}>
                <input
                  type="text"
                  className={styles.fieldInput}
                  value={userName}
                  disabled
                />
                <div className={styles.fieldStatus}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Verified
                </div>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Email Address
              </label>
              <div className={styles.fieldValue}>
                <input
                  type="email"
                  className={styles.fieldInput}
                  value={userEmail}
                  disabled
                />
                <div className={styles.fieldStatus}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Verified
                </div>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="16" r="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Account Role
              </label>
              <div className={styles.fieldValue}>
                <input
                  type="text"
                  className={styles.fieldInput}
                  value={userRole}
                  disabled
                />
                <div className={`${styles.fieldStatus} ${styles.adminStatus}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22S8 18 8 14V5L12 3L16 5V14C16 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Protected
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.profileFooter}>
          <div className={styles.securityNote}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Your profile information is protected and cannot be modified directly.</span>
          </div>
          
          <button
            className={`${styles.logoutBtn} ${isLoggingOut ? styles.loading : ''}`}
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <>
                <div className={styles.spinner}></div>
                Logging out...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Sign Out
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}