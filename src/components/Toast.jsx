import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Toast.css';

const Toast = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="toast-container">
      <div className="toast-content">
        <ShoppingBag size={18} className="toast-icon text-cyan" />
        <span className="toast-text">{toastMessage}</span>
      </div>
    </div>
  );
};

export default Toast;
