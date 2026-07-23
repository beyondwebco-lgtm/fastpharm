import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import './PartnerForm.css';

const STEPS = ['Shop Details', 'Licence Info', 'Documents', 'Account Setup'];

const PartnerForm = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    // Step 1
    shopName: '',
    regName: '',
    ownerName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    locationUrl: '',
    // Step 2
    drugLicence: '',
    drugLicenceType: 'Retail',
    drugLicenceExpiry: '',
    gstNumber: '',
    businessReg: '',
    yearsInBusiness: '',
    pharmacistName: '',
    pharmacistReg: '',
    openingTime: '',
    closingTime: '',
    deliveryAvailable: true,
    deliveryRadius: '',
    // Step 3 (Files)
    docDrugLicence: null,
    docPharmacistCert: null,
    docShopReg: null,
    docGst: null,
    docShopFront: null,
    docOwnerId: null,
    // Step 4
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isSubmitting) onClose();
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
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 0) {
      if (!formData.shopName.trim()) newErrors.shopName = 'Shop name is required';
      if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.email.trim()) newErrors.email = 'Email address is required';
      if (!formData.address.trim()) newErrors.address = 'Complete shop address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.pincode || formData.pincode.length !== 6) newErrors.pincode = 'Valid 6-digit PIN code is required';
    } else if (step === 1) {
      if (!formData.drugLicence.trim()) newErrors.drugLicence = 'Drug licence number is required';
      if (!formData.drugLicenceExpiry) newErrors.drugLicenceExpiry = 'Expiry date is required';
      if (!formData.pharmacistName.trim()) newErrors.pharmacistName = 'Pharmacist name is required';
      if (!formData.pharmacistReg.trim()) newErrors.pharmacistReg = 'Pharmacist registration number is required';
      if (!formData.openingTime) newErrors.openingTime = 'Opening time required';
      if (!formData.closingTime) newErrors.closingTime = 'Closing time required';
    } else if (step === 2) {
      if (!formData.docDrugLicence) newErrors.docDrugLicence = 'Drug licence document is required';
      if (!formData.docPharmacistCert) newErrors.docPharmacistCert = 'Pharmacist certificate is required';
    } else if (step === 3) {
      if (!formData.password || formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms & privacy policy';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(3)) {
      setIsSubmitting(true);
      // Simulate backend submission
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  const renderFileInput = (name, label, required = false) => (
    <div className="form-group file-upload-group">
      <label>{label} {required && <span className="required">*</span>}</label>
      <div className="file-upload-wrapper">
        <input 
          type="file" 
          id={`file-${name}`} 
          name={name}
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleChange}
          className="sr-only"
        />
        <label htmlFor={`file-${name}`} className="file-upload-btn">
          <Upload size={18} /> Choose File
        </label>
        <span className="file-name" title={formData[name]?.name}>
          {formData[name] ? formData[name].name : 'No file chosen'}
        </span>
      </div>
      {errors[name] && <span className="error-text">{errors[name]}</span>}
    </div>
  );

  return (
    <div className="modal-overlay" onClick={handleBackdropClick} role="dialog" aria-modal="true" aria-labelledby="partner-modal-title">
      <div className="partner-modal" ref={modalRef}>
        {!isSuccess && (
          <button className="close-btn" onClick={onClose} aria-label="Close modal" disabled={isSubmitting}>
            <X size={20} />
          </button>
        )}

        {isSuccess ? (
          <div className="success-state animate-fade-in">
            <div className="success-icon-wrapper">
              <CheckCircle2 size={64} className="text-neon-green" />
            </div>
            <h2 className="success-title">Application Submitted!</h2>
            <p className="success-message">
              Your partner application has been submitted successfully. Our team will review the details and contact you shortly.
            </p>
            <button className="btn btn-primary" onClick={onClose}>
              Return to Website
            </button>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <h2 id="partner-modal-title">Become a FastPharm Partner</h2>
              <p className="modal-subtitle">Register your medical shop and join the FastPharm delivery network.</p>
              
              <div className="step-indicator">
                {STEPS.map((stepName, idx) => (
                  <div key={stepName} className={`step-item ${idx <= currentStep ? 'active' : ''}`}>
                    <div className="step-dot">{idx + 1}</div>
                    <span className="step-label hidden-mobile">{stepName}</span>
                  </div>
                ))}
              </div>
            </div>

            <form className="partner-form-body" onSubmit={currentStep === STEPS.length - 1 ? handleSubmit : (e) => e.preventDefault()}>
              <div className="form-step-content animate-fade-in">
                {currentStep === 0 && (
                  <div className="form-section">
                    <h3>1. Shop Details</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Medical Shop Name <span className="required">*</span></label>
                        <input type="text" name="shopName" value={formData.shopName} onChange={handleChange} />
                        {errors.shopName && <span className="error-text">{errors.shopName}</span>}
                      </div>
                      <div className="form-group">
                        <label>Shop Reg Name (if different)</label>
                        <input type="text" name="regName" value={formData.regName} onChange={handleChange} />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Owner's Full Name <span className="required">*</span></label>
                        <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} />
                        {errors.ownerName && <span className="error-text">{errors.ownerName}</span>}
                      </div>
                      <div className="form-group">
                        <label>Owner's Phone <span className="required">*</span></label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                        {errors.phone && <span className="error-text">{errors.phone}</span>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Email Address <span className="required">*</span></label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} />
                      {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label>Shop Address <span className="required">*</span></label>
                      <input type="text" name="address" value={formData.address} onChange={handleChange} />
                      {errors.address && <span className="error-text">{errors.address}</span>}
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>City <span className="required">*</span></label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} />
                        {errors.city && <span className="error-text">{errors.city}</span>}
                      </div>
                      <div className="form-group">
                        <label>State <span className="required">*</span></label>
                        <input type="text" name="state" value={formData.state} onChange={handleChange} />
                        {errors.state && <span className="error-text">{errors.state}</span>}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>PIN Code <span className="required">*</span></label>
                        <input type="text" name="pincode" maxLength={6} value={formData.pincode} onChange={handleChange} />
                        {errors.pincode && <span className="error-text">{errors.pincode}</span>}
                      </div>
                      <div className="form-group">
                        <label>Google Maps URL (Optional)</label>
                        <input type="text" name="locationUrl" value={formData.locationUrl} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="form-section">
                    <h3>2. Licence & Business Info</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Drug Licence Number <span className="required">*</span></label>
                        <input type="text" name="drugLicence" value={formData.drugLicence} onChange={handleChange} />
                        {errors.drugLicence && <span className="error-text">{errors.drugLicence}</span>}
                      </div>
                      <div className="form-group">
                        <label>Licence Expiry Date <span className="required">*</span></label>
                        <input type="date" name="drugLicenceExpiry" value={formData.drugLicenceExpiry} onChange={handleChange} />
                        {errors.drugLicenceExpiry && <span className="error-text">{errors.drugLicenceExpiry}</span>}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>GST Number (Optional)</label>
                        <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Years in Business</label>
                        <input type="number" name="yearsInBusiness" value={formData.yearsInBusiness} onChange={handleChange} />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Pharmacist Name <span className="required">*</span></label>
                        <input type="text" name="pharmacistName" value={formData.pharmacistName} onChange={handleChange} />
                        {errors.pharmacistName && <span className="error-text">{errors.pharmacistName}</span>}
                      </div>
                      <div className="form-group">
                        <label>Pharmacist Reg Number <span className="required">*</span></label>
                        <input type="text" name="pharmacistReg" value={formData.pharmacistReg} onChange={handleChange} />
                        {errors.pharmacistReg && <span className="error-text">{errors.pharmacistReg}</span>}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Opening Time <span className="required">*</span></label>
                        <input type="time" name="openingTime" value={formData.openingTime} onChange={handleChange} />
                        {errors.openingTime && <span className="error-text">{errors.openingTime}</span>}
                      </div>
                      <div className="form-group">
                        <label>Closing Time <span className="required">*</span></label>
                        <input type="time" name="closingTime" value={formData.closingTime} onChange={handleChange} />
                        {errors.closingTime && <span className="error-text">{errors.closingTime}</span>}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="form-section">
                    <h3>3. Document Uploads</h3>
                    <p className="section-desc">Accepted formats: PDF, JPG, PNG. Max size 5MB.</p>
                    
                    {renderFileInput('docDrugLicence', 'Drug Licence Document', true)}
                    {renderFileInput('docPharmacistCert', 'Pharmacist Certificate', true)}
                    {renderFileInput('docShopReg', 'Shop Registration Cert (Optional)')}
                    {renderFileInput('docGst', 'GST Certificate (Optional)')}
                    {renderFileInput('docShopFront', 'Shop Front Photo (Optional)')}
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="form-section">
                    <h3>4. Account Setup</h3>
                    <div className="form-group">
                      <label>Create Password <span className="required">*</span></label>
                      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Min 8 characters" />
                      {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>

                    <div className="form-group">
                      <label>Confirm Password <span className="required">*</span></label>
                      <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                      {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                    </div>

                    <div className="form-group mt-2">
                      <label className="checkbox-label align-start">
                        <input type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} />
                        <span className="terms-text">
                          I accept the Partner Terms of Service and Privacy Policy <span className="required">*</span>
                        </span>
                      </label>
                      {errors.acceptTerms && <span className="error-text d-block mt-1">{errors.acceptTerms}</span>}
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                {currentStep > 0 ? (
                  <button type="button" className="btn btn-secondary" onClick={handlePrev} disabled={isSubmitting}>
                    <ChevronLeft size={18} /> Back
                  </button>
                ) : <div></div>}
                
                {currentStep < STEPS.length - 1 ? (
                  <button type="button" className="btn btn-primary" onClick={handleNext}>
                    Continue <ChevronRight size={18} />
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Partner Application'}
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default PartnerForm;
