// src/layouts/UserLayout.jsx
import React, { useState } from "react";
import UserSidebar from "../components/UserSideBar";
import UserTopbar from "../components/UserTopBar";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  const [showSidebar, setShowSidebar] = useState(true);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <div className="d-flex">
      {showSidebar && <UserSidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />}
      <div className="flex-grow-1 d-flex flex-column">
        <UserTopbar toggleSidebar={toggleSidebar} />
        <div className="container-fluid p-4 flex-grow-1 bg-light">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
