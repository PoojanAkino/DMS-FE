// src/pages/UserLogin.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function UserLogin() {
    return (
        <section className="vh-100 d-flex flex-column flex-md-row">
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
                        Nice to see you again. Secure document management made easy.
                        Manage, track, and control your files with confidence.
                    </p>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex-grow-1 d-flex align-items-center justify-content-center">
                <div className="w-100 px-4" style={{ maxWidth: "380px" }}>
                    <h3 className="mb-4 text-primary fw-bold">Login Account</h3>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email ID
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                required
                            />
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
