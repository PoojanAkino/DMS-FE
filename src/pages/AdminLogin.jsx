// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import styles from './Login.module.css';

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
    <section className={`${styles.loginSection} vh-100 d-flex flex-column flex-md-row`}>
      <ToastContainer 
        position="top-right" 
        autoClose={2000}
        className={styles.toastContainer}
      />

      {/* Animated background elements */}
      <div className={styles.backgroundElements}>
        <div className={`${styles.floatingElement} ${styles.element1}`}></div>
        <div className={`${styles.floatingElement} ${styles.element2}`}></div>
        <div className={`${styles.floatingElement} ${styles.element3}`}></div>
        <div className={`${styles.floatingElement} ${styles.element4}`}></div>
      </div>

      {/* Left Side - Welcome Panel */}
      <div className={`${styles.welcomePanel} col-md-6 d-none d-md-flex align-items-center justify-content-center text-white`}>
        <div className={styles.welcomeContent}>
          <div className={styles.welcomeIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className={styles.welcomeTitle}>Welcome Back</h2>
          <p className={styles.welcomeSubtitle}>
            Login to securely manage and access your documents with our 
            advanced role-based system.
          </p>
          <div className={styles.featureList}>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span>Secure Authentication</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span>Role-based Access</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span>Document Management</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className={`${styles.formPanel} flex-grow-1 d-flex align-items-center justify-content-center`}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <div className={styles.logoContainer}>
              <div className={styles.logo}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h3 className={styles.formTitle}>Login to Your Account</h3>
            <p className={styles.formSubtitle}>Enter your credentials to access your dashboard</p>
          </div>

          {error && (
            <div className={`${styles.errorAlert} alert`}>
              <span className={styles.errorIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                  <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </span>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.inputLabel}>
                Email Address
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  className={styles.formInput}
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.inputLabel}>
                Password
              </label>
              <div className={styles.passwordWrapper}>
                <span className={styles.inputIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="16" r="1" stroke="currentColor" strokeWidth="2"/>
                    <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className={styles.formInput}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={togglePassword}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 4.028 7.66032 6.18 6.06L17.94 17.94Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9.9 4.24C10.5883 4.0789 11.2931 3.99836 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19L9.9 4.24Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className={styles.submitSection}>
              <button type="submit" className={styles.submitButton}>
                <span className={styles.buttonContent}>
                  <span className={styles.buttonIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="10,17 15,12 10,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="15" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Sign In
                </span>
              </button>
            </div>

            <div className={styles.formFooter}>
              <p className={styles.signupPrompt}>
                Don't have an account?{" "}
                <Link to="/register" className={styles.signupLink}>
                  Create Account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}