// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
        userName,
        email,
        password
      });

      toast.success("Registration successful! Wait for Admin to activate your account.");
      setUserName("");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Registration failed.");
    }
    setIsSubmitting(false);
  };

  return (
    <section className="vh-100 d-flex flex-column flex-md-row">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Left Side */}
      <div
        className="col-md-6 d-none d-md-flex align-items-center justify-content-center text-white"
        style={{
          background: "linear-gradient(135deg, #007bff, #4facfe)",
        }}
      >
        <div className="text-center px-4">
          <h2 className="display-6 fw-bold">Join Our Community</h2>
          <p className="mt-3">
            Create your account to manage and share your documents securely.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="w-100 px-4" style={{ maxWidth: "380px" }}>
          <h3 className="mb-4 text-primary fw-bold">Register Account</h3>

          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email ID
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={togglePassword}
                  tabIndex={-1}
                >
                  <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                </button>
              </div>
            </div>

            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </div>
            <p className="text-center mb-0">
              Already have an account?{" "}
              <Link to="/admin-login" className="text-decoration-none">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
