import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window === "undefined") return [];

    try {
      const storedCart = window.localStorage.getItem("fastpharm-cart");
      const parsedCart = storedCart ? JSON.parse(storedCart) : [];

      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (error) {
      console.error("Unable to load saved cart:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "fastpharm-cart",
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error("Unable to save cart:", error);
    }
  }, [cartItems]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('Hyderabad, 500081');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`Added ${product.name} to cart`);
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item));
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const showToast = useCallback((message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, addToCart, removeFromCart, updateQuantity, clearCart,
      isCartOpen, toggleCart, openCart, closeCart, cartTotal, cartCount,
      toastMessage, searchQuery, setSearchQuery,
      deliveryLocation, setDeliveryLocation, isLocationModalOpen, setIsLocationModalOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};
