import React, { useState } from 'react';
import {
  CartContainer,
  CartTitle
} from '../styles/CartStyles';

const CheckoutForm = () => {
  const [item, setItem] = useState({
    product: 'Pants', // Default product
    quantity: 1,     // Default quantity
    size: 'S',       // Default size
    color: 'Red',    // Default color
  });

  const handleProductChange = (event) => {
    setItem({ ...item, product: event.target.value });
  };

  const handleQuantityChange = (event) => {
    setItem({ ...item, quantity: event.target.value });
  };

  const handleSizeChange = (event) => {
    setItem({ ...item, size: event.target.value });
  };

  const handleColorChange = (event) => {
    setItem({ ...item, color: event.target.value });
  };

  const handleAddToCart = () => {
    // Get the existing cart items from local storage or initialize an empty array
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Add the selected item to the cart
    cartItems.push(item);

    // Store the updated cart items in local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  return (
    <CartContainer>
      <CartTitle>Checkout Form</CartTitle>
      <div>
        <label>
          Product:
          <select value={item.product} onChange={handleProductChange}>
            <option value="Pants">Pants</option>
            <option value="Shorts">Shorts</option>
            <option value="Polos">Polos</option>
            <option value="Shirts">Shirts</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Quantity:
          <input
            type="number"
            value={item.quantity}
            onChange={handleQuantityChange}
            min="1"
            max="100"
          />
        </label>
      </div>
      <div>
        <label>
          Size:
          <select value={item.size} onChange={handleSizeChange}>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Color:
          <select value={item.color} onChange={handleColorChange}>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Black">Black</option>
          </select>
        </label>
      </div>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </CartContainer>
  );
};

export default CheckoutForm;