// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from './Register.module.css';

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
    <section className={`${styles.registerSection} vh-100 d-flex flex-column flex-md-row`}>
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
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className={styles.welcomeTitle}>Join Our Community</h2>
          <p className={styles.welcomeSubtitle}>
            Create your account to manage and share your documents securely 
            with our advanced document management system.
          </p>
          <div className={styles.benefitsList}>
            <div className={styles.benefitItem}>
              <span className={styles.benefitIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span>Secure Document Storage</span>
            </div>
            <div className={styles.benefitItem}>
              <span className={styles.benefitIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span>Role-based Access Control</span>
            </div>
            <div className={styles.benefitItem}>
              <span className={styles.benefitIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span>Complete Audit Trails</span>
            </div>
          </div>
          <div className={styles.trustBadge}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Trusted by professionals worldwide</span>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className={`${styles.formPanel} flex-grow-1 d-flex align-items-center justify-content-center`}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <div className={styles.logoContainer}>
              <div className={styles.logo}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21L12 19L16 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h3 className={styles.formTitle}>Create Your Account</h3>
            <p className={styles.formSubtitle}>Join thousands of professionals managing documents securely</p>
          </div>

          <form onSubmit={handleRegister} className={styles.registerForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="username" className={styles.inputLabel}>
                Full Name
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <input
                  type="text"
                  id="username"
                  className={styles.formInput}
                  placeholder="Enter your full name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
            </div>

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
                  placeholder="Create a strong password"
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
              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                <span className={styles.buttonContent}>
                  {isSubmitting ? (
                    <>
                      <span className={styles.spinner}></span>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <span className={styles.buttonIcon}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 21V5C19 4.46957 18.7893 3.96086 18.4142 3.58579C18.0391 3.21071 17.5304 3 17 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V21L12 17.5L19 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      Create Account
                    </>
                  )}
                </span>
              </button>
            </div>

            <div className={styles.formFooter}>
              <p className={styles.loginPrompt}>
                Already have an account?{" "}
                <Link to="/admin-login" className={styles.loginLink}>
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}