import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UserLogin from "./pages/UserLogin";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./layouts/AdminLayout";

import RequireUser from "./routes/RequireUser";
import UserDocuments from "./pages/User/UserDocuments";
import UserProfile from "./pages/User/UserProfile";
import UserLayout from "./layouts/UserLayout";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserManagement from "./pages/Admin/UserManagement";
import DocumentManagement from "./pages/Admin/DocumentManagement";
import ActivityLogs from "./pages/Admin/ActivityLogs";
import AdminProfile from "./pages/Admin/AdminProfile";
import RequireAdmin from "./routes/RequireAdmin";




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Admin routes */}
        <Route element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/documents" element={<DocumentManagement />} />
          <Route path="/admin/logs" element={<ActivityLogs />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
        </Route>

        {/* User routes with UserLayout */}
        <Route element={<RequireUser><UserLayout /></RequireUser>}>
          <Route path="/user/documents" element={<UserDocuments />} />
          <Route path="/user/profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
