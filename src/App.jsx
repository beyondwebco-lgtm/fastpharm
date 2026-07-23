import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';
import LocationModal from './components/LocationModal';
import Products from './pages/Products';
function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <div className="announcement-banner">
            15-MINUTE EXPRESS DELIVERY ACTIVE &bull; 24/7 EMERGENCY PHARMACY DARK STORES OPEN NEAR YOU
          </div>
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </main>
          <CartDrawer />
          <Toast />
          <LocationModal />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
