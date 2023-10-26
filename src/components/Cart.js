import React from 'react';
import {
  CartContainer,
  CartTitle,
  // CartItemContainer
} from '../styles/CartStyles';

const Cart = ({ cartItems }) => {
  return (
    <CartContainer>
      <CartTitle>Shopping Cart</CartTitle>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                Product: {item.product}, Quantity: {item.quantity}, Size: {item.size}, Color: {item.color}
              </li>
            ))}
          </ul>
    </CartContainer>
  );
};

export default Cart;