// src/components/AdminTopbar.jsx
import React, { useState } from "react";
import styles from './AdminTopbar.module.css';

export default function AdminTopbar({ toggleSidebar }) {
  const userName = localStorage.getItem("userName") || "Admin";
  const userRole = localStorage.getItem("role") || "Admin";
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <nav className={styles.topbar}>
      {/* Left Section */}
      <div className={styles.topbarLeft}>
        <button
          className={`${styles.menuToggle} d-md-none`}
          onClick={toggleSidebar}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className={styles.breadcrumb}>
          <span className={styles.greeting}>{getGreeting()},</span>
          <span className={styles.userName}>{userName}</span>
        </div>
      </div>

      {/* Right Section */}
      <div className={styles.topbarRight}>
        {/* Profile Dropdown */}
        <div className={styles.profileContainer}>
          <button 
            className={styles.profileBtn}
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          >
            <div className={styles.avatar}>
              <span className={styles.avatarText}>
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className={styles.profileInfo}>
              <span className={styles.profileName}>{userName}</span>
              <span className={styles.profileRole}>{userRole}</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.dropdownIcon}>
              <polyline points="6,9 12,15 18,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {showProfileDropdown && (
            <div className={styles.profileDropdown}>
              <div className={styles.dropdownHeader}>
                <div className={styles.dropdownAvatar}>
                  <span>{userName.charAt(0).toUpperCase()}</span>
                </div>
                <div className={styles.dropdownInfo}>
                  <span className={styles.dropdownName}>{userName}</span>
                  <span className={styles.dropdownEmail}>{localStorage.getItem("userEmail")}</span>
                </div>
              </div>
              
              <div className={styles.dropdownDivider}></div>
              
              <div className={styles.dropdownItems}>
                <a href={`/${userRole.toLowerCase()}/profile`} className={styles.dropdownItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>My Profile</span>
                </a>
                
                <div className={styles.dropdownDivider}></div>
                
                <button onClick={handleLogout} className={`${styles.dropdownItem} ${styles.logoutBtn}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}