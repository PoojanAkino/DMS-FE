// src/components/HeroSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from './HeroSection.module.css';

export default function HeroSection() {
    return (
        <section className={`${styles.heroSection} py-5 text-center w-100 position-relative overflow-hidden`}>
            {/* Animated background elements */}
            <div className={styles.backgroundElements}>
                <div className={`${styles.floatingElement} ${styles.element1}`}></div>
                <div className={`${styles.floatingElement} ${styles.element2}`}></div>
                <div className={`${styles.floatingElement} ${styles.element3}`}></div>
                <div className={`${styles.floatingElement} ${styles.element4}`}></div>
                <div className={`${styles.floatingElement} ${styles.element5}`}></div>
            </div>

            {/* Gradient overlay */}
            <div className={styles.gradientOverlay}></div>

            <div className="container position-relative">
                <div className={styles.iconContainer}>
                    <div className={styles.iconWrapper}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                </div>
                
                <h1 className={`${styles.title} display-4 fw-bold mb-3`}>
                    Document Management System
                </h1>
                
                <p className={`${styles.subtitle} lead mb-4`}>
                    Secure, efficient, and role-based document management with
                    comprehensive audit trails and user access controls.
                </p>
                
                <div className={styles.buttonContainer}>
                    <Link 
                        to="/admin-login" 
                        className={`${styles.primaryButton} btn btn-lg px-4 py-3 position-relative overflow-hidden`}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-3px) scale(1.02)';
                            e.target.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0) scale(1)';
                            e.target.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.3)';
                        }}
                    >
                        <span className="position-relative d-flex align-items-center justify-content-center gap-2">
                            <span className={styles.buttonIcon}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                                    <circle cx="12" cy="16" r="1" stroke="currentColor" strokeWidth="2"/>
                                    <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                            </span>
                            Access Admin Panel
                        </span>
                    </Link>
                </div>

                {/* Feature highlights */}
                <div className={styles.featureHighlights}>
                    <div className={styles.feature}>
                        <span className={styles.featureIcon}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                                <circle cx="12" cy="16" r="1" stroke="currentColor" strokeWidth="2"/>
                                <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                        </span>
                        <span>Secure Access</span>
                    </div>
                    <div className={styles.feature}>
                        <span className={styles.featureIcon}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                        <span>Fast Performance</span>
                    </div>
                    <div className={styles.feature}>
                        <span className={styles.featureIcon}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                                <rect x="7" y="7" width="3" height="9" stroke="currentColor" strokeWidth="2"/>
                                <rect x="14" y="7" width="3" height="5" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                        </span>
                        <span>Analytics Dashboard</span>
                    </div>
                </div>
            </div>
        </section>
    );
}