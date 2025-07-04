// src/components/HeroSection.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
    return (
        <section className="py-5 bg-light text-center w-100 position-relative overflow-hidden">
            {/* Animated background elements */}
            <div className="position-absolute top-0 start-0 w-100 h-100 opacity-25">
                <div className="position-absolute" style={{
                    top: '10%',
                    left: '10%',
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(45deg, #007bff, #0056b3)',
                    borderRadius: '50%',
                    animation: 'float 6s ease-in-out infinite'
                }}></div>
                <div className="position-absolute" style={{
                    top: '60%',
                    right: '15%',
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(45deg, #6c757d, #495057)',
                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                    animation: 'float 8s ease-in-out infinite reverse'
                }}></div>
                <div className="position-absolute" style={{
                    bottom: '20%',
                    left: '20%',
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(45deg, #007bff, #20c997)',
                    borderRadius: '50%',
                    animation: 'float 7s ease-in-out infinite'
                }}></div>
            </div>

            <div className="container position-relative">
                <div className="mb-4" style={{
                    animation: 'fadeInUp 0.8s ease-out'
                }}>
                    <div className="d-inline-block p-4 rounded-circle bg-white shadow-lg mb-3" style={{
                        animation: 'pulse 2s infinite'
                    }}>
                        <span className="display-1" style={{
                            background: 'linear-gradient(45deg, #007bff, #0056b3)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>📄</span>
                    </div>
                </div>
                
                <h1 className="display-4 fw-bold mb-3" style={{
                    animation: 'fadeInUp 0.8s ease-out 0.2s both',
                    background: 'linear-gradient(45deg, #212529, #495057)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    Document Management System
                </h1>
                
                <p className="lead mb-4 text-muted" style={{
                    animation: 'fadeInUp 0.8s ease-out 0.4s both',
                    maxWidth: '600px',
                    margin: '0 auto 2rem auto'
                }}>
                    Secure, efficient, and role-based document management with
                    comprehensive audit trails and user access controls.
                </p>
                
                <div className="d-flex justify-content-center gap-3" style={{
                    animation: 'fadeInUp 0.8s ease-out 0.6s both'
                }}>
                    <Link 
                        to="/admin-login" 
                        className="btn btn-primary btn-lg px-4 py-3 shadow-lg position-relative overflow-hidden"
                        style={{
                            background: 'linear-gradient(45deg, #007bff, #0056b3)',
                            border: 'none',
                            borderRadius: '15px',
                            transition: 'all 0.3s ease',
                            transform: 'translateY(0)',
                            boxShadow: '0 8px 25px rgba(0, 123, 255, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-3px)';
                            e.target.style.boxShadow = '0 12px 35px rgba(0, 123, 255, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 8px 25px rgba(0, 123, 255, 0.3)';
                        }}
                    >
                        <span className="position-relative">
                            🔐 Access Admin Panel
                        </span>
                    </Link>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                
                .btn-primary::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: left 0.5s;
                }
                
                .btn-primary:hover::before {
                    left: 100%;
                }
            `}</style>
        </section>
    );
}