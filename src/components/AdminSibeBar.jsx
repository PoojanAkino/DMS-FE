import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar({ showSidebar, toggleSidebar }) {
  const userRole = localStorage.getItem("role");

  return (
    <div
      className={`d-flex flex-column flex-shrink-0 p-3 bg-white shadow-sm ${
        showSidebar ? "" : "d-none"
      }`}
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link
          to={userRole === "Admin" ? "/admin/dashboard" : "/user/documents"}
          className="text-decoration-none fw-bold fs-6 w-100 text-center text-primary"
        >
          {userRole === "Admin" ? "DMS Admin" : "DMS User"}
        </Link>
        <button
          className="btn btn-sm btn-outline-secondary d-md-none"
          onClick={toggleSidebar}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      <hr />

      <ul className="nav nav-pills flex-column mb-auto">
        {userRole === "Admin" && (
          <>
            <li>
              <NavLink
                to="/admin/dashboard"
                className="nav-link d-flex align-items-center"
              >
                <i className="bi bi-speedometer2 me-2"></i> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/users"
                className="nav-link d-flex align-items-center"
              >
                <i className="bi bi-people me-2"></i> User Management
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/documents"
                className="nav-link d-flex align-items-center"
              >
                <i className="bi bi-folder2-open me-2"></i> Documents
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/logs"
                className="nav-link d-flex align-items-center"
              >
                <i className="bi bi-journal-text me-2"></i> Activity Logs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/profile"
                className="nav-link d-flex align-items-center"
              >
                <i className="bi bi-gear me-2"></i> Profile
              </NavLink>
            </li>
          </>
        )}

        {userRole === "User" && (
          <>
            <li>
              <NavLink
                to="/user/documents"
                className="nav-link d-flex align-items-center"
              >
                <i className="bi bi-folder2-open me-2"></i> Documents
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/profile"
                className="nav-link d-flex align-items-center"
              >
                <i className="bi bi-person me-2"></i> Profile
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
