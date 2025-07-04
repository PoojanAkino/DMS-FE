// src/components/FeatureCards.jsx
import React from "react";

export default function FeatureCards() {
  const features = [
    {
      icon: "👥",
      title: "User Management",
      description:
        "Role-based access control with Admin and User permissions. Secure user creation and management capabilities.",
      color: "linear-gradient(135deg, #007bff, #0056b3)",
      bgColor: "rgba(0, 123, 255, 0.1)"
    },
    {
      icon: "📁",
      title: "Document Control",
      description:
        "Upload, download, update, and delete documents with proper ownership controls and global document sharing.",
      color: "linear-gradient(135deg, #6c757d, #495057)",
      bgColor: "rgba(108, 117, 125, 0.1)"
    },
    {
      icon: "📝",
      title: "Audit Trail",
      description:
        "Complete activity logging with timestamps, and comprehensive audit trails for compliance.",
      color: "linear-gradient(135deg, #007bff, #20c997)",
      bgColor: "rgba(0, 123, 255, 0.1)"
    },
  ];

  return (
    <section className="py-5 bg-white w-100 position-relative overflow-hidden">
      {/* Background pattern */}
      <div className="position-absolute top-0 start-0 w-100 h-100 opacity-25">
        <div className="position-absolute" style={{
          top: '5%',
          right: '5%',
          width: '120px',
          height: '120px',
          background: 'linear-gradient(45deg, #f8f9fa, #e9ecef)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite'
        }}></div>
        <div className="position-absolute" style={{
          bottom: '10%',
          left: '5%',
          width: '90px',
          height: '90px',
          background: 'linear-gradient(45deg, #f8f9fa, #e9ecef)',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          animation: 'float 6s ease-in-out infinite reverse'
        }}></div>
      </div>

      <div className="container text-center position-relative">
        <div className="mb-5" style={{
          animation: 'fadeInUp 0.8s ease-out'
        }}>
          <h2 className="mb-3" style={{
            background: 'linear-gradient(45deg, #212529, #495057)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: '700'
          }}>
            Comprehensive Document Control
          </h2>
          <p className="text-muted mb-0" style={{
            fontSize: '1.1rem',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Everything you need to manage documents securely with role-based access.
          </p>
          <div className="mx-auto mt-3" style={{
            width: '100px',
            height: '4px',
            background: 'linear-gradient(45deg, #007bff, #0056b3)',
            borderRadius: '2px'
          }}></div>
        </div>

        <div className="row justify-content-center">
          {features.map((feature, index) => (
            <div 
              className="col-md-4 mb-4" 
              key={index}
              style={{
                animation: `fadeInUp 0.8s ease-out ${0.2 + index * 0.2}s both`
              }}
            >
              <div 
                className="card h-100 shadow-sm position-relative overflow-hidden"
                style={{
                  border: 'none',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
                  transition: 'all 0.3s ease',
                  transform: 'translateY(0)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                }}
              >
                {/* Card background accent */}
                <div 
                  className="position-absolute top-0 start-0 w-100" 
                  style={{
                    height: '5px',
                    background: feature.color
                  }}
                ></div>
                
                {/* Floating background element */}
                <div 
                  className="position-absolute"
                  style={{
                    top: '20px',
                    right: '20px',
                    width: '60px',
                    height: '60px',
                    background: feature.bgColor,
                    borderRadius: '50%',
                    opacity: '0.3'
                  }}
                ></div>

                <div className="card-body p-4 position-relative">
                  <div className="mb-3">
                    <div 
                      className="d-inline-block p-3 rounded-circle shadow-sm"
                      style={{
                        background: feature.color,
                        transform: 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'rotate(10deg) scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
                      }}
                    >
                      <span className="display-4" style={{
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                      }}>
                        {feature.icon}
                      </span>
                    </div>
                  </div>
                  
                  <h5 className="card-title mb-3" style={{
                    fontWeight: '600',
                    color: '#212529'
                  }}>
                    {feature.title}
                  </h5>
                  
                  <p className="card-text text-muted" style={{
                    lineHeight: '1.6',
                    fontSize: '0.95rem'
                  }}>
                    {feature.description}
                  </p>
                </div>

                {/* Hover shine effect */}
                <div 
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.6s ease',
                    pointerEvents: 'none'
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
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
        
        .card:hover .position-absolute:last-child {
          transform: translateX(100%);
        }
        
        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        
        .card:hover::before {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}