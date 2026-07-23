import React, { useState, useEffect, useRef } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import './AuthModal.css';

const AuthModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [isOtpLogin, setIsOtpLogin] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const modalRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    phone: '',
    otp: '',
    fullName: '',
    email: '',
    confirmPassword: '',
    address: '',
    city: '',
    pincode: '',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus trap & Escape listener
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isSubmitting) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, isSubmitting]);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target) && !isSubmitting) {
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateLogin = () => {
    const newErrors = {};
    if (isOtpLogin) {
      const phoneClean = formData.phone.replace(/\D/g, '').replace(/^91/, '');
      if (!phoneClean || phoneClean.length !== 10) newErrors.phone = 'Valid 10-digit phone number required';
      if (otpSent && (!formData.otp || formData.otp.length < 4)) newErrors.otp = 'Enter a valid OTP';
    } else {
      if (!formData.identifier.trim()) newErrors.identifier = 'Phone or Email is required';
      if (!formData.password) newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = () => {
    const newErrors = {};
    if (!formData.fullName.trim() || formData.fullName.length < 2) newErrors.fullName = 'Name must be at least 2 characters';
    
    const phoneClean = formData.phone.replace(/\D/g, '').replace(/^91/, '');
    if (!phoneClean || phoneClean.length !== 10) newErrors.phone = 'Valid 10-digit phone number required';
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email address';
    
    if (!formData.password || formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the Terms & Privacy Policy';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = activeTab === 'login' ? validateLogin() : validateRegister();
    
    if (isValid) {
      setIsSubmitting(true);
      // Mock API call placeholder
      setTimeout(() => {
        setIsSubmitting(false);
        // Replace with actual authentication integration
        alert(`${activeTab === 'login' ? 'Login' : 'Registration'} successful!`);
        onClose();
      }, 1000);
    }
  };

  const handleSendOtp = () => {
    const phoneClean = formData.phone.replace(/\D/g, '').replace(/^91/, '');
    if (!phoneClean || phoneClean.length !== 10) {
      setErrors({ ...errors, phone: 'Valid 10-digit phone number required' });
      return;
    }
    // Mock sending OTP
    setOtpSent(true);
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick} role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
      <div className="auth-modal" ref={modalRef}>
        <button className="close-btn" onClick={onClose} aria-label="Close modal" disabled={isSubmitting}>
          <X size={20} />
        </button>

        <h2 id="auth-modal-title" className="sr-only">Authentication</h2>
        
        <div className="auth-tabs">
          <button 
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => { setActiveTab('login'); setErrors({}); }}
            type="button"
          >
            Login
          </button>
          <button 
            className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => { setActiveTab('register'); setErrors({}); }}
            type="button"
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {activeTab === 'login' && (
            <div className="form-section animate-fade-in">
              <div className="login-mode-toggle">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={isOtpLogin} 
                    onChange={(e) => { setIsOtpLogin(e.target.checked); setErrors({}); }} 
                  />
                  Login with OTP
                </label>
              </div>

              {isOtpLogin ? (
                <>
                  <div className="form-group">
                    <label htmlFor="auth-phone">Phone Number</label>
                    <div className="phone-input-group">
                      <span className="country-code">+91</span>
                      <input 
                        type="tel" 
                        id="auth-phone" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                      />
                    </div>
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>

                  {!otpSent ? (
                    <button type="button" className="btn btn-secondary full-width" onClick={handleSendOtp}>
                      Send OTP
                    </button>
                  ) : (
                    <div className="form-group animate-fade-in">
                      <label htmlFor="auth-otp">Enter OTP</label>
                      <input 
                        type="text" 
                        id="auth-otp" 
                        name="otp"
                        value={formData.otp}
                        onChange={handleChange}
                        placeholder="4 or 6 digit OTP"
                        maxLength={6}
                      />
                      {errors.otp && <span className="error-text">{errors.otp}</span>}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label htmlFor="identifier">Phone number or Email</label>
                    <input 
                      type="text" 
                      id="identifier" 
                      name="identifier"
                      value={formData.identifier}
                      onChange={handleChange}
                      placeholder="Enter phone or email"
                    />
                    {errors.identifier && <span className="error-text">{errors.identifier}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="login-password">Password</label>
                    <div className="password-input-wrapper">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        id="login-password" 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                      />
                      <button 
                        type="button" 
                        className="toggle-password-btn" 
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.password && <span className="error-text">{errors.password}</span>}
                  </div>

                  <div className="form-actions-row">
                    <label className="checkbox-label">
                      <input type="checkbox" name="rememberMe" />
                      Remember me
                    </label>
                    <a href="#" className="forgot-password-link" onClick={(e) => e.preventDefault()}>
                      Forgot password?
                    </a>
                  </div>
                </>
              )}

              <button type="submit" className="btn btn-primary full-width submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : 'Login'}
              </button>
            </div>
          )}

          {activeTab === 'register' && (
            <div className="form-section scrollable-section animate-fade-in">
              <div className="form-group">
                <label htmlFor="reg-name">Full Name <span className="required">*</span></label>
                <input 
                  type="text" 
                  id="reg-name" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
                {errors.fullName && <span className="error-text">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="reg-phone">Phone Number <span className="required">*</span></label>
                <div className="phone-input-group">
                  <span className="country-code">+91</span>
                  <input 
                    type="tel" 
                    id="reg-phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                  />
                </div>
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="reg-email">Email Address (Optional)</label>
                <input 
                  type="email" 
                  id="reg-email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="reg-password">Password <span className="required">*</span></label>
                <div className="password-input-wrapper">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    id="reg-password" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min 8 characters"
                  />
                  <button 
                    type="button" 
                    className="toggle-password-btn" 
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="reg-confirm-password">Confirm Password <span className="required">*</span></label>
                <input 
                  type="password" 
                  id="reg-confirm-password" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
              </div>
              
              <div className="form-divider">Optional Delivery Details</div>

              <div className="form-group">
                <label htmlFor="reg-address">Delivery Address</label>
                <input 
                  type="text" 
                  id="reg-address" 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street, Apartment"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="reg-city">City</label>
                  <input 
                    type="text" 
                    id="reg-city" 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="reg-pincode">PIN Code</label>
                  <input 
                    type="text" 
                    id="reg-pincode" 
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="6 digits"
                    maxLength={6}
                  />
                </div>
              </div>

              <div className="form-group mt-2">
                <label className="checkbox-label align-start">
                  <input 
                    type="checkbox" 
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                  />
                  <span className="terms-text">
                    I accept the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a> <span className="required">*</span>
                  </span>
                </label>
                {errors.acceptTerms && <span className="error-text d-block mt-1">{errors.acceptTerms}</span>}
              </div>

              <button type="submit" className="btn btn-primary full-width submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
