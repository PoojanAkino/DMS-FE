// src/pages/Admin/UserManagement.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from './UserManagement.module.css';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [adminForm, setAdminForm] = useState({ userName: "", email: "", password: "" });
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggle = async (userId, isActive) => {
    try {
      const endpoint = isActive ? "deactivate" : "activate";
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/${endpoint}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success(`User ${isActive ? "deactivated" : "activated"}!`);
      fetchUsers();
    } catch (error) {
      console.error("Toggle failed:", error);
      toast.error("Action failed. Try again.");
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setFormError("");
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/create-admin`, adminForm, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Admin created successfully!");
      setShowModal(false);
      setAdminForm({ userName: "", email: "", password: "" });
      fetchUsers();
    } catch (error) {
      setFormError(error.response?.data?.message || "Something went wrong");
      toast.error(formError);
    }
  };

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentUsers = users.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(users.length / rowsPerPage);

  const getRoleIcon = (role) => {
    if (role === 'Admin') {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 1.17157 16.1716C0.421427 16.9217 0 17.9391 0 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="17,11 19,13 23,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className={styles.userManagement}>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>User Management</h1>
          <p className={styles.subtitle}>Manage users and administrators in your system</p>
        </div>
        <button className={styles.createBtn} onClick={() => setShowModal(true)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Create Admin
        </button>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th>Sr No.</th>
                <th>User Details</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {currentUsers.map((user, index) => (
                <tr key={user._id} className={styles.tableRow}>
                  <td className={styles.srNo}>
                    {indexOfFirst + index + 1}
                  </td>
                  <td className={styles.userDetails}>
                    <div className={styles.userAvatar}>
                      {user.userName.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.userInfo}>
                      <div className={styles.userName}>{user.userName}</div>
                      <div className={styles.userEmail}>{user.email}</div>
                    </div>
                  </td>
                  <td className={styles.roleCell}>
                    <div className={`${styles.roleTag} ${styles[user.role.toLowerCase() + 'Role']}`}>
                      {getRoleIcon(user.role)}
                      <span>{user.role}</span>
                    </div>
                  </td>
                  <td className={styles.statusCell}>
                    <div className={`${styles.statusBadge} ${user.isActive ? styles.active : styles.inactive}`}>
                      <div className={styles.statusDot}></div>
                      {user.isActive ? "Active" : "Inactive"}
                    </div>
                  </td>
                  <td className={styles.actionsCell}>
                    {user.role !== "Admin" ? (
                      <button
                        className={`${styles.actionBtn} ${user.isActive ? styles.deactivateBtn : styles.activateBtn}`}
                        onClick={() => handleToggle(user._id, user.isActive)}
                      >
                        {user.isActive ? (
                          <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Deactivate
                          </>
                        ) : (
                          <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <polyline points="9,12 12,15 15,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Activate
                          </>
                        )}
                      </button>
                    ) : (
                      <span className={styles.noAction}>Protected</span>
                    )}
                  </td>
                </tr>
              ))}
              {currentUsers.length === 0 && (
                <tr>
                  <td colSpan="5" className={styles.emptyState}>
                    <div className={styles.emptyIcon}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M23 21V19C23 18.1645 22.7155 17.3541 22.2094 16.7071C21.7033 16.0601 20.9998 15.6182 20.2 15.46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 3.46C16.8003 3.61801 17.5042 4.05991 18.0106 4.70694C18.5169 5.35397 18.8015 6.16435 18.8015 7C18.8015 7.83565 18.5169 8.64603 18.0106 9.29306C17.5042 9.94009 16.8003 10.382 16 10.54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3>No users found</h3>
                    <p>There are no users in the system yet.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {users.length > rowsPerPage && (
          <div className={styles.pagination}>
            <button
              className={`${styles.paginationBtn} ${currentPage === 1 ? styles.disabled : ''}`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline points="15,18 9,12 15,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Previous
            </button>
            
            <div className={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </div>
            
            <button
              className={`${styles.paginationBtn} ${currentPage === totalPages ? styles.disabled : ''}`}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline points="9,18 15,12 9,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <form onSubmit={handleCreateAdmin} className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>Create New Admin</h2>
                <button 
                  type="button" 
                  className={styles.closeBtn} 
                  onClick={() => setShowModal(false)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              
              <div className={styles.modalBody}>
                {formError && (
                  <div className={styles.errorAlert}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {formError}
                  </div>
                )}
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Full Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    className={styles.formInput}
                    placeholder="Enter full name"
                    required
                    value={adminForm.userName}
                    onChange={(e) => setAdminForm({ ...adminForm, userName: e.target.value })}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Email Address <span className={styles.required}>*</span>
                  </label>
                  <input
                    className={styles.formInput}
                    placeholder="Enter email address"
                    required
                    type="email"
                    value={adminForm.email}
                    onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Password <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.passwordInput}>
                    <input
                      className={styles.formInput}
                      placeholder="Enter password"
                      required
                      type={showPassword ? "text" : "password"}
                      value={adminForm.password}
                      onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                    />
                    <button
                      type="button"
                      className={styles.passwordToggle}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className={styles.modalFooter}>
                <button 
                  type="button" 
                  className={styles.cancelBtn} 
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.submitBtn}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="17,11 19,13 23,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Create Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}