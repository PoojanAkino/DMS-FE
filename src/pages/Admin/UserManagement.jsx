// src/pages/Admin/UserManagement.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [adminForm, setAdminForm] = useState({ userName: "", email: "", password: "" });
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggle = async (userId, isActive) => {
    try {
      const endpoint = isActive ? "deactivate" : "activate";
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/${endpoint}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success(`User ${isActive ? "deactivated" : "activated"}!`);
      fetchUsers();
    } catch (error) {
      console.error("Toggle failed:", error);
      toast.error("Action failed. Try again.");
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setFormError("");
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/create-admin`, adminForm, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Admin created successfully!");
      setShowModal(false);
      setAdminForm({ userName: "", email: "", password: "" });
      fetchUsers();
    } catch (error) {
      setFormError(error.response?.data?.message || "Something went wrong");
      toast.error(formError);
    }
  };

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentUsers = users.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(users.length / rowsPerPage);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>User Management</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Create Admin
        </button>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>Sr No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{indexOfFirst + index + 1}</td>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <span className={`badge ${user.isActive ? "bg-success" : "bg-secondary"}`}>
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    {user.role !== "Admin" && (
                      <button
                        className={`btn btn-sm ${user.isActive ? "btn-outline-danger" : "btn-outline-success"}`}
                        onClick={() => handleToggle(user._id, user.isActive)}
                      >
                        {user.isActive ? "Deactivate" : "Activate"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {currentUsers.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {users.length > rowsPerPage && (
            <nav className="mt-3">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleCreateAdmin}>
                <div className="modal-header">
                  <h5 className="modal-title">Create Admin</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
                </div>
                <div className="modal-body">
                  {formError && <div className="alert alert-danger">{formError}</div>}
                  <label className="form-label">
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control mb-2"
                    placeholder="Name"
                    required
                    value={adminForm.userName}
                    onChange={(e) => setAdminForm({ ...adminForm, userName: e.target.value })}
                  />
                  <label className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control mb-2"
                    placeholder="Email"
                    required
                    type="email"
                    value={adminForm.email}
                    onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                  />
                  <label className="form-label">
                    Password <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      className="form-control"
                      placeholder="Password"
                      required
                      type={showPassword ? "text" : "password"}
                      value={adminForm.password}
                      onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </button>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Create Admin
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
