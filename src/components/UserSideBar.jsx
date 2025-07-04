// src/components/UserSidebar.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function UserSidebar({ showSidebar, toggleSidebar }) {
  return (
    <div
      className={`d-flex flex-column flex-shrink-0 p-3 bg-white shadow-sm ${
        showSidebar ? "" : "d-none"
      }`}
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link
          to="/user/documents"
          className="text-decoration-none fw-bold fs-6 w-100 text-center text-primary"
        >
          DMS User
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
      </ul>
    </div>
  );
}
