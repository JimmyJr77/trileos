import React from 'react';
import CartItem from './CartItem';
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
  CheckoutTitle,
  CartItemsContainer
} from '../styles/CartStyles';

<<<<<<< Updated upstream
const Cart = ({ cartItems }) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
=======
const Cart = () => {
  const { cartItems = [] } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
>>>>>>> Stashed changes
  const tax = subtotal * 0.07;
  const estimatedShipping = 5;
  const total = subtotal + tax + estimatedShipping;

  return (
    <CartContainer>
      <CartTitle>Shopping Cart</CartTitle>
      <CartContainerStyled>
        <CartItemsContainer>
          {cartItems.map}((item)) ={'>'} (
            <CartItem key={item.id} item={item} />
          )
        </CartItemsContainer>
<<<<<<< Updated upstream
          <SubTotalsContainer>
            <CheckoutDetailsBox>
              <CheckoutTitle>Checkout Details</CheckoutTitle>
              <hr />

              {cartItems.map((item, index) => (
                <p key={index}>
                  {item.quantity}X {item.product.name}: ${item.product.price * item.quantity}
                </p>
              ))}
              <Subtotal>Subtotal: ${subtotal.toFixed(2)}</Subtotal>
              <Tax>Tax: ${tax.toFixed(2)}</Tax>
              <Shipping>Est Shipping: TBD</Shipping>
              <Total>Total: ${total.toFixed(2)}</Total>
              <CheckoutButton>Checkout</CheckoutButton>
            </CheckoutDetailsBox>
          </SubTotalsContainer>
=======
        <SubTotalsContainer>
          <CheckoutDetails cartItems={cartItems} subtotal={subtotal} tax={tax} estimatedShipping={estimatedShipping} total={total} />
        </SubTotalsContainer>
>>>>>>> Stashed changes
      </CartContainerStyled>
    </CartContainer>
  );
};
<<<<<<< Updated upstream

export default Cart;
=======
export default Cart;
 
>>>>>>> Stashed changes
