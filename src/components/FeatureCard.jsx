// src/components/FeatureCards.jsx
import React from "react";
import styles from './FeatureCard.module.css';

export default function FeatureCards() {
  const features = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "User Management",
      description:
        "Role-based access control with Admin and User permissions. Secure user creation and management capabilities.",
      color: "linear-gradient(135deg, #6366f1, #8b5cf6)",
      bgColor: "rgba(99, 102, 241, 0.1)",
      accentColor: "#6366f1"
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Document Control",
      description:
        "Upload, download, update, and delete documents with proper ownership controls and global document sharing.",
      color: "linear-gradient(135deg, #10b981, #059669)",
      bgColor: "rgba(16, 185, 129, 0.1)",
      accentColor: "#10b981"
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 11H15M9 15H15M17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H12.586C12.8512 3.00006 13.1055 3.10545 13.293 3.293L18.707 8.707C18.8946 8.89449 18.9999 9.14881 19 9.414V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Audit Trail",
      description:
        "Complete activity logging with timestamps, and comprehensive audit trails for compliance.",
      color: "linear-gradient(135deg, #f59e0b, #d97706)",
      bgColor: "rgba(245, 158, 11, 0.1)",
      accentColor: "#f59e0b"
    },
  ];

  return (
    <section className={`${styles.featuresSection} py-5 w-100 position-relative overflow-hidden`}>
      {/* Background pattern */}
      <div className={styles.backgroundPattern}>
        <div className={`${styles.patternElement} ${styles.pattern1}`}></div>
        <div className={`${styles.patternElement} ${styles.pattern2}`}></div>
        <div className={`${styles.patternElement} ${styles.pattern3}`}></div>
      </div>

      <div className="container text-center position-relative">
        <div className={styles.sectionHeader}>
          <div className={styles.badge}>Features</div>
          <h2 className={styles.sectionTitle}>
            Comprehensive Document Control
          </h2>
          <p className={styles.sectionSubtitle}>
            Everything you need to manage documents securely with role-based access and complete audit trails.
          </p>
          <div className={styles.titleAccent}></div>
        </div>

        <div className="row justify-content-center">
          {features.map((feature, index) => (
            <div 
              className="col-lg-4 col-md-6 mb-4" 
              key={index}
              style={{
                animation: `fadeInUp 0.8s ease-out ${0.2 + index * 0.2}s both`
              }}
            >
              <div 
                className={`${styles.featureCard} card h-100 position-relative overflow-hidden`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)';
                  e.currentTarget.style.boxShadow = `0 30px 60px ${feature.accentColor}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                }}
              >
                {/* Card glow effect */}
                <div 
                  className={styles.cardGlow}
                  style={{ background: feature.color }}
                ></div>
                
                {/* Floating background accent */}
                <div 
                  className={styles.floatingAccent}
                  style={{ background: feature.bgColor }}
                ></div>

                <div className="card-body p-4 position-relative">
                  <div className={styles.iconContainer}>
                    <div 
                      className={styles.iconWrapper}
                      style={{ background: feature.color }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'rotate(10deg) scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
                      }}
                    >
                      <span className={styles.cardIcon}>
                        {feature.icon}
                      </span>
                    </div>
                  </div>
                  
                  <h5 className={styles.cardTitle}>
                    {feature.title}
                  </h5>
                  
                  <p className={styles.cardDescription}>
                    {feature.description}
                  </p>

                  <div className={styles.cardFooter}>
                    <span 
                      className={styles.learnMore}
                      style={{ color: feature.accentColor }}
                    >
                      Learn More 
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '0.5rem', display: 'inline-block' }}>
                        <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="12,5 19,12 12,19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Hover shine effect */}
                <div className={styles.shineEffect}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA section */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Ready to get started?</h3>
            <p className={styles.ctaSubtitle}>
              Experience the power of professional document management today.
            </p>
            <div className={styles.ctaStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>99.9%</span>
                <span className={styles.statLabel}>Uptime</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>256-bit</span>
                <span className={styles.statLabel}>Encryption</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>24/7</span>
                <span className={styles.statLabel}>Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}