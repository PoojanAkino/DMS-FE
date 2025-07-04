// src/layouts/AdminLayout.jsx
import React, { useState } from "react";
import AdminSidebar from "../components/AdminSibeBar";
import AdminTopbar from "../components/AdminTopBar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [showSidebar, setShowSidebar] = useState(true);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <div className="d-flex">
      {showSidebar && (
        <AdminSidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      )}

      <div className="flex-grow-1 d-flex flex-column">
        <AdminTopbar toggleSidebar={toggleSidebar} />
        <div className="container-fluid p-4 flex-grow-1 bg-light">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
