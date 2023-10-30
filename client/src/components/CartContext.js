import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState('');

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
    setNotification(`${item.quantity} x ${item.product.name} added to cart`);
    setTimeout(() => setNotification(''), 3000); // Hide notification after 3s
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, notification }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
