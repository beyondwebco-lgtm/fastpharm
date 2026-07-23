import React from 'react';
import { Clock, ShieldCheck, Zap } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="badge badge-fast animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Zap size={14} /> Ultra-Fast Delivery
          </div>
          <h1 className="hero-title animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Your Medicines, Delivered in <span className="text-gradient">15 Minutes</span>
          </h1>
          <p className="hero-description animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Experience the future of healthcare. Get genuine medicines and health products delivered to your doorstep faster than ever before.
          </p>
          <div className="hero-actions animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <button className="btn btn-primary">
              Order Now
            </button>
            <button className="btn btn-secondary">
              Upload Prescription
            </button>
          </div>
          
          <div className="hero-stats animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="stat-item">
              <Clock className="stat-icon text-cyan" />
              <div>
                <div className="stat-value">15 Min</div>
                <div className="stat-label">Avg. Delivery</div>
              </div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <ShieldCheck className="stat-icon text-green" />
              <div>
                <div className="stat-value">100%</div>
                <div className="stat-label">Genuine</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hero-visual animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="glow-orb orb-1"></div>
          <div className="glow-orb orb-2"></div>
          <div className="glass-card">
            <div className="capsule-animation-container">
              <div className="capsule-wrapper">
                <div className="capsule-top"></div>
                <div className="capsule-bottom"></div>
                <div className="capsule-particles">
                  <span className="c-particle p1">✨</span>
                  <span className="c-particle p2">✨</span>
                  <span className="c-particle p3">✨</span>
                </div>
                <div className="capsule-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
