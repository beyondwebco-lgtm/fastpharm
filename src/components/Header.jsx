import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, MapPin, Search, Menu, X, Activity } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount, openCart, searchQuery, setSearchQuery } = useCart();

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <Activity className="logo-icon" />
          <span className="logo-text">Fast<span className="text-gradient">Pharm</span></span>
        </Link>
        
        <div className="location-selector hidden-mobile">
          <MapPin size={18} className="text-muted" />
          <span className="location-text">Deliver to <span className="location-highlight">Hyderabad, 500081</span></span>
        </div>

        <div className="search-bar hidden-mobile">
          <input 
            type="text" 
            placeholder="Search medicines, composition, generics..." 
            className="search-input" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')} 
              className="clear-search-btn"
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginRight: '0.5rem', display: 'flex', alignItems: 'center' }}
            >
              <X size={16} />
            </button>
          )}
          <button className="search-btn">
            <Search size={18} />
          </button>
        </div>

        <nav className="nav-links hidden-mobile">
          <Link to="/upload" className="nav-link badge badge-fast">Upload Prescription</Link>
          <Link to="/partners" className="nav-link">Partners</Link>
          <Link to="/login" className="nav-icon-link">
            <User size={24} />
          </Link>
          <button onClick={openCart} className="nav-icon-link cart-link btn-reset">
            <ShoppingCart size={24} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </nav>

        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="search-bar-mobile" style={{ display: 'flex', alignItems: 'center' }}>
            <input 
              type="text" 
              placeholder="Search..." 
              className="search-input" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')} 
                className="clear-search-btn"
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <X size={16} />
              </button>
            )}
          </div>
          <Link to="/upload" className="mobile-nav-link">Upload Prescription</Link>
          <Link to="/partners" className="mobile-nav-link">Partners</Link>
          <Link to="/login" className="mobile-nav-link">Login / Register</Link>
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
    </header>
  );
};

export default Header;
