// src/components/UserTopbar.jsx
import React from "react";

export default function UserTopbar({ toggleSidebar }) {
  const userName = localStorage.getItem("userName") || "User";

  return (
    <nav className="navbar navbar-light bg-white border-bottom px-4 py-3">
      <button
        className="btn btn-outline-secondary d-md-none"
        onClick={toggleSidebar}
      >
        <i className="bi bi-list"></i>
      </button>
      <span className="navbar-text ms-auto fw-semibold">
        Welcome, {userName}
      </span>
    </nav>
  );
}
