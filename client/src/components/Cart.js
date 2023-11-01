import React from 'react';
import CartItem from './CartItem';
import { useCart } from './CartContext';
import {
  CartContainer,
  CartContainerStyled,
  CartTitle,
  SubTotalsContainer,
  Subtotal,
  Tax,
  Shipping,
  Total,
  CheckoutButton,
  CheckoutDetailsBox,
  CartItemsContainer,
  CheckoutTitle
} from '../styles/CartStyles';
import {useQuery} from "@apollo/client"
import { GET_USER_ORDER_HISTORY } from '../utils/queries';
const Cart = () => {
  const { cartItems = [] } = useCart();
<<<<<<< HEAD

<<<<<<< HEAD
//const {loading, data} = useQuery(GET_USER_ORDER_HISTORY)
//const cartItems = data?.GetUserOrderHistory || []

//cartItems.orders
 

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
=======
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);  
>>>>>>> 3a39bfae6f993baf28a92523f30a7514d7861f1e
=======

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);  
>>>>>>> 3a39bfae6f993baf28a92523f30a7514d7861f1e
  const tax = subtotal * 0.07;
  const estimatedShipping = 5;
  const total = subtotal + tax + estimatedShipping;

  return (
    <CartContainer>
      <CartTitle>Shopping Cart</CartTitle>
      <CartContainerStyled>
        <CartItemsContainer>
          {cartItems.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </CartItemsContainer>
        <SubTotalsContainer>
          <CheckoutDetailsBox>
            <CheckoutTitle>Checkout Details</CheckoutTitle>
            <hr />
            {cartItems.map((item, index) => (
              <p key={index}>
                {item.quantity}X {item.name}: ${item.price * item.quantity}
              </p>
            ))}
            <Subtotal>Subtotal: ${subtotal.toFixed(2)}</Subtotal>
            <Tax>Tax: ${tax.toFixed(2)}</Tax>
            <Shipping>Est Shipping: TBD</Shipping>
            <Total>Total: ${total.toFixed(2)}</Total>
            <CheckoutButton>Checkout</CheckoutButton>
          </CheckoutDetailsBox>
        </SubTotalsContainer>
      </CartContainerStyled>
    </CartContainer>
  );
};

export default Cart;
