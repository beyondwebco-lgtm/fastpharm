import React, { useState } from 'react';
import { Filter, Star, Plus, Clock, TrendingUp, ShieldAlert, FileText, Bell } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './MedicineCatalog.css';

import { MOCK_PRODUCTS } from '../data/medicines';

const CATEGORY_TABS = [
  'All Medicines', 
  'Emergency & First Aid', 
  'Pain & Fever', 
  'Antibiotics (Rx)', 
  'Diabetes & BP Care', 
  'Vitamins & Wellness'
];

const STOCK_FILTERS = [
  'In Stock Only',
  'Low Stock (Urgent)'
];

const MedicineCatalog = () => {
  const [activeCategory, setActiveCategory] = useState('All Medicines');
  const [activeStockFilter, setActiveStockFilter] = useState(null);
  const { addToCart, searchQuery, cartItems, updateQuantity } = useCart();

  const getFilteredProducts = () => {
    let filtered = MOCK_PRODUCTS;
    
    if (activeCategory !== 'All Medicines') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }
    
    if (activeStockFilter === 'In Stock Only') {
      filtered = filtered.filter(p => p.stockStatus === 'In Stock');
    } else if (activeStockFilter === 'Low Stock (Urgent)') {
      filtered = filtered.filter(p => p.stockStatus === 'Low Stock');
    }

    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.fullName.toLowerCase().includes(query) ||
        p.composition.toLowerCase().includes(query) ||
        p.generic.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const handleStockFilterToggle = (filterName) => {
    if (activeStockFilter === filterName) {
      setActiveStockFilter(null); // toggle off
    } else {
      setActiveStockFilter(filterName);
    }
  };

  const handleNotify = (productName) => {
    alert(`You will be notified when ${productName} is back in stock.`);
  };

  return (
    <section className="catalog-section">
      <div className="container">
        <div className="section-header">
          <div className="header-titles">
            <h2>15-Min Express <span className="text-gradient">Catalog</span></h2>
            <p className="catalog-desc">Genuine medicines stored under temperature-controlled 15-minute pharmacy hubs.</p>
          </div>
        </div>

        <div className="catalog-layout">
          <aside className="filters-sidebar hidden-mobile">
            <div className="filter-card">
              <div className="filter-header">
                <h3><Filter size={18} /> Categories</h3>
              </div>
              <ul className="category-list">
                {CATEGORY_TABS.map(cat => (
                  <li key={cat}>
                    <button 
                      className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="filter-card">
              <div className="filter-header">
                <h3><ShieldAlert size={18} /> Availability</h3>
              </div>
              <ul className="category-list">
                {STOCK_FILTERS.map(filter => (
                  <li key={filter}>
                    <button 
                      className={`category-btn ${activeStockFilter === filter ? 'active-filter' : ''}`}
                      onClick={() => handleStockFilterToggle(filter)}
                    >
                      {filter}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="catalog-content">
            <div className="mobile-categories hidden-desktop">
              <div className="category-scroll">
                {CATEGORY_TABS.map(cat => (
                  <button 
                    key={cat}
                    className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
                <div className="pill-divider"></div>
                {STOCK_FILTERS.map(filter => (
                  <button 
                    key={filter}
                    className={`category-pill stock-pill ${activeStockFilter === filter ? 'active-filter' : ''}`}
                    onClick={() => handleStockFilterToggle(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="results-count">
              Showing {filteredProducts.length} items
            </div>

            <div className="products-grid">
              {filteredProducts.map(product => {
                const isOutOfStock = product.stockStatus === 'Out of Stock';
                const isLowStock = product.stockStatus === 'Low Stock';
                const isRx = product.type === 'Rx Required';

                const cartItem = cartItems.find((item) => item.id === product.id);
                const quantity = cartItem?.quantity ?? 0;

                return (
                  <div key={product.id} className={`product-card ${isOutOfStock ? 'out-of-stock-card' : ''}`}>
                    <div className="product-badges-top">
                      <div className="delivery-time-badge">
                        <Clock size={12} /> {product.deliveryTime}
                      </div>
                      {isRx && (
                        <div className="rx-badge">
                          <FileText size={12} /> Rx
                        </div>
                      )}
                    </div>
                    
                    <div className="product-image-container">
                      <img src={product.image} alt={product.name} className="product-image-img" loading="lazy" />
                      <div className="savings-badge">Save {product.savings}</div>
                    </div>
                    
                    <div className="product-details">
                      <span className={`stock-status ${isOutOfStock ? 'status-out' : (isLowStock ? 'status-low' : 'status-in')}`}>
                        {isOutOfStock ? `Out of Stock (${product.restockTime})` : `${product.stockStatus}, ${product.stockCount} left`}
                      </span>
                      
                      <h3 className="product-name" title={product.fullName}>{product.name}</h3>
                      <p className="product-composition" title={product.composition}>{product.composition}</p>
                      
                      <div className="generic-suggestion small">
                        <TrendingUp size={12} className="text-pink" />
                        <span>{product.generic}</span>
                      </div>
                      
                      <div className="product-footer">
                        <div className="price-container">
                          <div className="product-price">₹{product.price.toFixed(1)}</div>
                          <div className="original-price">₹{product.originalPrice.toFixed(1)}</div>
                        </div>
                        
                        {isOutOfStock ? (
                          <button 
                            className="btn-action notify-btn"
                            onClick={() => handleNotify(product.name)}
                          >
                            <Bell size={16} /> Notify Restock
                          </button>
                        ) : quantity === 0 ? (
                          <button 
                            className={`btn-action ${isLowStock ? 'urgent-btn' : 'add-btn'}`}
                            onClick={() => addToCart(product)}
                          >
                            <Plus size={16} /> 
                            Add
                          </button>
                        ) : (
                          <div
                            className="product-quantity-control"
                            aria-label={`Quantity controls for ${product.name}`}
                          >
                            <button
                              type="button"
                              className="qty-btn"
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              aria-label={`Decrease ${product.name} quantity`}
                            >
                              −
                            </button>
                            <span className="qty-value" aria-live="polite">{quantity}</span>
                            <button
                              type="button"
                              className="qty-btn"
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              aria-label={`Increase ${product.name} quantity`}
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedicineCatalog;
