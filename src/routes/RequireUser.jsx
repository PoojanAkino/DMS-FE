// src/components/RequireUser.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function RequireUser({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "User") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
