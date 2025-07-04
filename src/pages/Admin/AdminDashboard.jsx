// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);

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

  return (
    <div className="container-fluid">
      <h2 className="mb-4 fw-bold">Admin Dashboard</h2>

      <div className="row mb-4">
        <div className="col-md-4 col-lg-3 mb-3">
          <div className="card text-center shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title text-muted">Total Users</h5>
              <p className="display-5 fw-bold text-primary">{totalUsers}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-3 mb-3">
          <div className="card text-center shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title text-muted">Total Admins</h5>
              <p className="display-5 fw-bold text-info">{totalAdmins}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-3 mb-3">
          <div className="card text-center shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title text-muted">Total Documents</h5>
              <p className="display-5 fw-bold text-success">{totalDocuments}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h5 className="card-title fw-bold mb-3">Recent Activity</h5>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>User</th>
                  <th>Action</th>
                  <th>Document</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {recentActivities.length > 0 ? (
                  recentActivities.map((activity) => (
                    <tr key={activity._id}>
                      <td>{activity.user ? activity.user.userName : "Unknown"}</td>
                      <td>
                        <span
                          className={`badge ${
                            activity.action === "upload"
                              ? "bg-primary"
                              : activity.action === "delete"
                              ? "bg-danger"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {activity.action.charAt(0).toUpperCase() +
                            activity.action.slice(1)}
                        </span>
                      </td>
                      <td>{activity.document || "N/A"}</td>
                      <td>{formatDate(activity.createdAt)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-4">
                      No recent activity found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
