import React, { useState } from 'react';
import { Filter, Star, Plus, Clock, TrendingUp, ShieldAlert, FileText, Bell } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './MedicineCatalog.css';

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Dolo 650mg',
    fullName: 'Dolo 650mg Tablet',
    deliveryTime: '10 mins',
    type: 'OTC',
    stockStatus: 'In Stock',
    stockCount: 142,
    composition: 'Paracetamol / Acetaminophen 650mg',
    generic: 'Generic Paracetamol 650mg',
    savings: '48%',
    price: 30.5,
    originalPrice: 34,
    category: 'Pain & Fever',
    image: '/images/dolo 650.jpg'
  },
  {
    id: 2,
    name: 'Augmentin 625 Duo',
    fullName: 'Augmentin 625 Duo Tablet',
    deliveryTime: '12 mins',
    type: 'Rx Required',
    stockStatus: 'Low Stock',
    stockCount: 3,
    composition: 'Amoxicillin 500mg + Clavulanic Acid 125mg',
    generic: 'Amoxy-Clav 625 Generic',
    savings: '45%',
    price: 201.7,
    originalPrice: 223.42,
    category: 'Antibiotics (Rx)',
    image: '/images/Augmentin 625.avif'
  },
  {
    id: 3,
    name: 'Volini Spray',
    fullName: 'Volini Max Pain Relief Spray 100g',
    deliveryTime: '8 mins',
    type: 'OTC',
    stockStatus: 'In Stock',
    stockCount: 88,
    composition: 'Diclofenac Diethylamine + Methyl Salicylate + Menthol',
    generic: 'Diclofenac Pain Relief Spray Generic',
    savings: '41%',
    price: 145,
    originalPrice: 175,
    category: 'Pain & Fever',
    image: '/images/volini spray.avif'
  },
  {
    id: 4,
    name: 'Pan-D Capsule',
    fullName: 'Pan-D Gastro Capsule',
    deliveryTime: '11 mins',
    type: 'OTC',
    stockStatus: 'In Stock',
    stockCount: 65,
    composition: 'Pantoprazole 40mg + Domperidone 30mg Sustained Release',
    generic: 'Pantop-D SR Generic Cap',
    savings: '54%',
    price: 148,
    originalPrice: 199,
    category: 'Emergency & First Aid',
    image: '/images/Pan-D Capsule.avif'
  },
  {
    id: 5,
    name: 'Cetzine 10mg',
    fullName: 'Cetzine 10mg Anti-Allergy Tablet',
    deliveryTime: '9 mins',
    type: 'OTC',
    stockStatus: 'Low Stock',
    stockCount: 2,
    composition: 'Cetirizine Hydrochloride 10mg',
    generic: 'Generic Cetirizine 10mg',
    savings: '53%',
    price: 21.5,
    originalPrice: 24.5,
    category: 'Emergency & First Aid',
    image: '/images/Cetzine 10mg.avif'
  },
  {
    id: 6,
    name: 'Glycomet-GP 2',
    fullName: 'Glycomet-GP 2 Tablet',
    deliveryTime: '14 mins',
    type: 'Rx Required',
    stockStatus: 'In Stock',
    stockCount: 54,
    composition: 'Metformin 500mg + Glimepiride 2mg',
    generic: 'Metformin-Glimepiride 2 Generic',
    savings: '53%',
    price: 174.5,
    originalPrice: 217,
    category: 'Diabetes & BP Care',
    image: '/images/Glycomet-GP 2.avif'
  },
  {
    id: 7,
    name: 'Telma 40mg',
    fullName: 'Telma 40mg BP Tablet',
    deliveryTime: '12 mins',
    type: 'Rx Required',
    stockStatus: 'Out of Stock',
    restockTime: 'restocking in 25 mins',
    stockCount: 0,
    composition: 'Telmisartan 40mg',
    generic: 'Telmisartan 40mg Generic',
    savings: '52%',
    price: 108,
    originalPrice: 135,
    category: 'Diabetes & BP Care',
    image: '/images/Telma 40mg.avif'
  },
  {
    id: 8,
    name: 'Limcee Vitamin C',
    fullName: 'Limcee 500mg Chewable Vitamin C',
    deliveryTime: '7 mins',
    type: 'OTC',
    stockStatus: 'In Stock',
    stockCount: 210,
    composition: 'Ascorbic Acid 500mg, Orange Flavor',
    generic: 'Vitamin C Generic 500mg Chewable',
    savings: '39%',
    price: 23.05,
    originalPrice: 25.6,
    category: 'Vitamins & Wellness',
    image: '/images/Limcee Vitamin C.avif'
  },
  {
    id: 9,
    name: 'Crocin 650 Advance',
    fullName: 'Crocin 650 Advance Tablet',
    deliveryTime: '9 mins',
    type: 'OTC',
    stockStatus: 'In Stock',
    stockCount: 95,
    composition: 'Fast-release Paracetamol 650mg with Optizorb',
    generic: 'Paracetamol 650 Generic',
    savings: '48%',
    price: 31,
    originalPrice: 34.5,
    category: 'Pain & Fever',
    image: '/images/Crocin 650 Advance.avif'
  },
  {
    id: 10,
    name: 'Digene Mint Syrup',
    fullName: 'Digene Mint Syrup 200ml',
    deliveryTime: '10 mins',
    type: 'OTC',
    stockStatus: 'Low Stock',
    stockCount: 4,
    composition: 'Magnesium Hydroxide + Simethicone + Aluminium Hydroxide Gel',
    generic: 'Generic Antacid Mint Gel Syrup 200ml',
    savings: '44%',
    price: 125,
    originalPrice: 148,
    category: 'Emergency & First Aid',
    image: '/images/Digene Mint Syrup.jpg'
  },
  {
    id: 11,
    name: 'Band-Aid Wound Kit',
    fullName: 'Band-Aid First Aid Wound Care Kit',
    deliveryTime: '6 mins',
    type: 'OTC',
    stockStatus: 'In Stock',
    stockCount: 35,
    composition: 'Antiseptic Wipes + Povidone Ointment + Sterile Gauze + Waterproof Plasters',
    generic: 'Standard Emergency First Aid Box',
    savings: '42%',
    price: 165,
    originalPrice: 195,
    category: 'Emergency & First Aid',
    image: '/images/Band-Aid Wound Kit.jpg'
  },
  {
    id: 12,
    name: 'Revital H Supplement',
    fullName: 'Revital H Daily Health Supplement',
    deliveryTime: '9 mins',
    type: 'OTC',
    stockStatus: 'Out of Stock',
    restockTime: 'restocking in 40 mins',
    stockCount: 0,
    composition: 'Natural Ginseng + 10 Essential Vitamins + 9 Minerals',
    generic: 'Multivitamin + Ginseng Generic Capsules',
    savings: '43%',
    price: 310,
    originalPrice: 375,
    category: 'Vitamins & Wellness',
    image: '/images/Revital H Supplement.jpg'
  }
];

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
