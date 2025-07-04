// src/pages/AdminProfile.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <div className="container py-5">
      <ToastContainer position="top-right" autoClose={1500} />

      <h2 className="mb-4 fw-bold text-primary">
        <i className="bi bi-person-circle me-2"></i> Admin Profile
      </h2>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label text-muted">
              <i className="bi bi-person-fill me-2"></i>Name
            </label>
            <input
              type="text"
              className="form-control"
              value={userName}
              disabled
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-muted">
              <i className="bi bi-envelope-fill me-2"></i>Email
            </label>
            <input
              type="email"
              className="form-control"
              value={userEmail}
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-muted">
              <i className="bi bi-shield-lock-fill me-2"></i>Role
            </label>
            <input
              type="text"
              className="form-control"
              value={userRole}
              disabled
            />
          </div>

          <button
            className="btn btn-outline-danger"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Logging out...
              </>
            ) : (
              <>
                <i className="bi bi-box-arrow-right me-2"></i>Logout
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
