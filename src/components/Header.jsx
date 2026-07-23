import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, MapPin, Search, Menu, X, Activity } from 'lucide-react';
import { useCart } from '../context/CartContext';
import SearchAutocomplete from './SearchAutocomplete';
import AuthModal from './AuthModal';
import PartnerForm from './PartnerForm';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const { cartCount, openCart, searchQuery, setSearchQuery, deliveryLocation, setIsLocationModalOpen } = useCart();

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <Activity className="logo-icon" />
          <span className="logo-text">Fast<span className="text-gradient">Pharm</span></span>
        </Link>
        
        <div className="location-selector hidden-mobile" onClick={() => setIsLocationModalOpen(true)} style={{ cursor: 'pointer' }}>
          <MapPin size={18} className="text-muted" />
          <span className="location-text">Deliver to <span className="location-highlight">{deliveryLocation}</span></span>
        </div>

        <SearchAutocomplete isMobile={false} />

        <nav className="nav-links hidden-mobile">
          <Link to="/upload" className="nav-link badge badge-fast">Upload Prescription</Link>
          <button type="button" onClick={() => setActiveModal('partner')} className="nav-link btn-reset" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>Partners</button>
          <button type="button" onClick={() => setActiveModal('auth')} className="nav-icon-link btn-reset">
            <User size={24} />
          </button>
          <button onClick={openCart} className="nav-icon-link cart-link btn-reset">
            <ShoppingCart size={24} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </nav>

        <div className="mobile-header-actions">
          <button
            type="button"
            className="mobile-search-trigger"
            onClick={() => setIsMobileSearchOpen((current) => !current)}
            aria-label={isMobileSearchOpen ? "Close search" : "Search medicines"}
            aria-expanded={isMobileSearchOpen}
          >
            <Search size={22} />
          </button>
          
          <button onClick={openCart} className="nav-icon-link cart-link btn-reset mobile-cart-icon-btn cart-trigger" aria-label="Open Cart">
            <ShoppingCart size={22} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          
          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {isMobileSearchOpen && (
        <div className="mobile-search-panel hidden-desktop">
          <SearchAutocomplete isMobile={true} />
        </div>
      )}
      
      {isMenuOpen && (
        <div className="mobile-menu">
          <button 
            onClick={() => {
              setIsLocationModalOpen(true);
              setIsMenuOpen(false);
            }} 
            className="mobile-nav-link btn-reset-mobile"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <MapPin size={16} className="text-cyan" />
            <span>Location: {deliveryLocation}</span>
          </button>
          <Link to="/upload" className="mobile-nav-link">Upload Prescription</Link>
          <button 
            type="button"
            onClick={() => {
              setActiveModal('partner');
              setIsMenuOpen(false);
            }} 
            className="mobile-nav-link btn-reset-mobile"
          >
            Partners
          </button>
          <button 
            type="button"
            onClick={() => {
              setActiveModal('auth');
              setIsMenuOpen(false);
            }} 
            className="mobile-nav-link btn-reset-mobile"
          >
            Login / Register
          </button>
          <button 
            onClick={() => {
              openCart();
              setIsMenuOpen(false);
            }} 
            className="mobile-nav-link btn-reset-mobile"
          >
            Cart ({cartCount})
          </button>
        </div>
      )}

      {activeModal === 'auth' && <AuthModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'partner' && <PartnerForm onClose={() => setActiveModal(null)} />}
    </header>
  );
};

export default Header;
