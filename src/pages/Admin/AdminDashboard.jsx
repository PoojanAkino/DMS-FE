// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './AdminDashboard.module.css';

export default function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setTotalUsers(response.data.totalUsers);
        setTotalAdmins(response.data.totalAdmins);
        setTotalDocuments(response.data.totalDocuments);
        setRecentActivities(response.data.recentActivities || []);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'upload':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="7,10 12,5 17,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="12" y1="5" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'delete':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'update':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        <p className={styles.subtitle}>Overview of your system's key metrics and recent activities</p>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.usersCard}`}>
          <div className={styles.statContent}>
            <div className={styles.statInfo}>
              <h3 className={styles.statTitle}>Total Users</h3>
              <p className={styles.statNumber}>{totalUsers}</p>
            </div>
            <div className={styles.statIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M23 21V19C23 18.1645 22.7155 17.3541 22.2094 16.7071C21.7033 16.0601 20.9998 15.6182 20.2 15.46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 3.46C16.8003 3.61801 17.5042 4.05991 18.0106 4.70694C18.5169 5.35397 18.8015 6.16435 18.8015 7C18.8015 7.83565 18.5169 8.64603 18.0106 9.29306C17.5042 9.94009 16.8003 10.382 16 10.54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

        </div>

        <div className={`${styles.statCard} ${styles.adminsCard}`}>
          <div className={styles.statContent}>
            <div className={styles.statInfo}>
              <h3 className={styles.statTitle}>Total Admins</h3>
              <p className={styles.statNumber}>{totalAdmins}</p>
            </div>
            <div className={styles.statIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 1.17157 16.1716C0.421427 16.9217 0 17.9391 0 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="17,11 19,13 23,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

        </div>

        <div className={`${styles.statCard} ${styles.documentsCard}`}>
          <div className={styles.statContent}>
            <div className={styles.statInfo}>
              <h3 className={styles.statTitle}>Total Documents</h3>
              <p className={styles.statNumber}>{totalDocuments}</p>
            </div>
            <div className={styles.statIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

        </div>
      </div>

      {/* Recent Activity */}
      <div className={styles.activitySection}>
        <div className={styles.activityHeader}>
          <h2 className={styles.activityTitle}>Recent Activity</h2>
        </div>
        
        <div className={styles.activityCard}>
          {recentActivities.length > 0 ? (
            <div className={styles.activityList}>
              {recentActivities.map((activity) => (
                <div key={activity._id} className={styles.activityItem}>
                  <div className={styles.activityLeft}>
                    <div className={`${styles.activityIconWrapper} ${styles[`${activity.action}Icon`]}`}>
                      {getActionIcon(activity.action)}
                    </div>
                    <div className={styles.activityDetails}>
                      <div className={styles.activityUser}>
                        {activity.user ? activity.user.userName : "Unknown User"}
                      </div>
                      <div className={styles.activityDescription}>
                        <span className={styles.actionText}>
                          {activity.action === 'upload' ? 'uploaded' : 
                           activity.action === 'delete' ? 'deleted' : 'updated'}
                        </span>
                        <span className={styles.documentName}>
                          {activity.document || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.activityRight}>
                    <div className={styles.activityTime}>
                      {formatDate(activity.createdAt)}
                    </div>
                    <div className={`${styles.activityBadge} ${styles[`${activity.action}Badge`]}`}>
                      {activity.action.charAt(0).toUpperCase() + activity.action.slice(1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 14S9.5 16 12 16S16 14 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="9" y1="9" x2="9.01" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="15" y1="9" x2="15.01" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={styles.emptyTitle}>No Recent Activity</h3>
              <p className={styles.emptyDescription}>
                When users start interacting with documents, their activities will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}