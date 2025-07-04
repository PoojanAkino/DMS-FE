
import React from "react";
import { Navigate } from "react-router-dom";

export default function RequireAdmin({ children }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token || userRole !== "Admin") {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}
