import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Clock, ShieldAlert } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

const CartDrawer = () => {
  const { cartItems, isCartOpen, closeCart, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="cart-overlay" onClick={closeCart}>
      <div className="cart-drawer" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <div className="cart-title">
            <ShoppingBag size={20} className="text-cyan" />
            <h2>Your Cart</h2>
            <span className="cart-count-badge">{cartItems.length} Items</span>
          </div>
          <button className="close-btn" onClick={closeCart}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart-state">
              <div className="empty-cart-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Genuine medicines delivered in 15 minutes. Add some products to get started!</p>
              <button className="browse-btn" onClick={closeCart}>Browse Catalog</button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-img-container">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                  </div>
                  <div className="cart-item-info">
                    <div className="cart-item-top">
                      <h4 className="cart-item-name">{item.name}</h4>
                      <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="cart-item-composition">{item.fullName}</p>
                    
                    <div className="cart-item-bottom">
                      <span className="cart-item-price">₹{(item.price * item.quantity).toFixed(1)}</span>
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="delivery-promise">
              <Clock size={16} className="text-cyan animate-pulse" />
              <span>Guaranteed Delivery in <strong>15 Mins</strong></span>
            </div>

            <div className="bill-details">
              <div className="bill-row">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(1)}</span>
              </div>
              <div className="bill-row">
                <span>Delivery Charge</span>
                <span className="text-gradient">FREE</span>
              </div>
              <div className="bill-row total-row">
                <span>Total Amount</span>
                <span>₹{cartTotal.toFixed(1)}</span>
              </div>
            </div>

            <button className="checkout-btn" onClick={() => alert('Proceeding to Checkout! (Integration Coming)')}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
