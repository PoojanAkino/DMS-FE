// src/components/UserSidebar.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from './UserSideBar.module.css';

export default function UserSidebar({ showSidebar, toggleSidebar }) {
  return (
    <div
      className={`${styles.sidebar} d-flex flex-column flex-shrink-0 p-3 ${
        showSidebar ? "" : "d-none"
      }`}
    >
      {/* Header Section */}
      <div className={styles.sidebarHeader}>
        <Link
          to="/user/documents"
          className={styles.brandLink}
        >
          <div className={styles.brandIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandTitle}>DMS</span>
            <span className={styles.brandSubtitle}>User Portal</span>
          </div>
        </Link>
        <button
          className={`${styles.closeBtnMobile} btn d-md-none`}
          onClick={toggleSidebar}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className={styles.divider}></div>

      {/* Navigation Menu */}
      <nav className={styles.sidebarNav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink
              to="/user/documents"
              className={({ isActive }) => 
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              <span className={styles.navIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className={styles.navText}>My Documents</span>
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/user/profile"
              className={({ isActive }) => 
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              <span className={styles.navIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className={styles.navText}>Profile</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}