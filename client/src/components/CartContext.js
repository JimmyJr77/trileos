import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../utils/auth';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      // Initialize cart from localStorage
      const token = authService.loggedIn() ? authService.getProfile()._id : authService.getGuestToken() || 'guest';
      const items = JSON.parse(localStorage.getItem(`cart_${token}`));
      if (Array.isArray(items)) {
        console.log('Loaded from localStorage:', items);
        return items;
      }
    } catch (err) {
      console.error('Error loading cart from localStorage:', err);
    }
    return [];
  });

  useEffect(() => {
    // Save cart to localStorage on change
    const token = authService.loggedIn() ? authService.getProfile()._id : authService.getGuestToken() || 'guest';
    localStorage.setItem(`cart_${token}`, JSON.stringify(cartItems));
  }, [cartItems]);
  

  const [notification, setNotification] = useState('');

  const addToCart = (item) => {
    if (!item || !item.productId || !item.variantId || !item.name || !item.size || !item.color || item.price === undefined || item.quantity <= 0) {
      console.error('Invalid item added to cart', item);
      return;
    }
    setCartItems((prevItems) => [...prevItems, item]);
    setNotification(`${item.quantity} x ${item.name} added to cart`);
    setTimeout(() => setNotification(''), 3000); // Hide notification after 3s
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, notification }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

export { CartProvider };
 