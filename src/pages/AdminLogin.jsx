// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        { email, password }
      );

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userName", user.userName);

      toast.success("Login successful!");

      if (user.role === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/documents");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed.");
    }
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
          <h2 className="display-6 fw-bold">Welcome Back</h2>
          <p className="mt-3">
            Login to securely manage and access your documents.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="w-100 px-4" style={{ maxWidth: "380px" }}>
          <h3 className="mb-4 text-primary fw-bold">Login Account</h3>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email ID
              </label>
              <input
                type="email"
                className="form-control"
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
                  placeholder="Enter your password"
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
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>

            <p className="text-center mb-0">
              Don’t have an account?{" "}
              <Link to="/register" className="text-decoration-none">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
