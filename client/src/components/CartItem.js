import React from 'react';
import {
  CartItemContainer,
  ItemDetails,
  ItemName,
  ItemSize,
  ItemColor,
  UnitCost,
  Quantity,
  ItemSubTotal,
} from '../styles/CartItemStyles';

const CartItem = ({ item }) => {
  // Add a console log to identify what's received
  console.log('Received item:', item);

  return (
    <CartItemContainer>
      <ItemDetails>
        <ItemName>{item.name}</ItemName>
        <ItemSize>Size: {item.size}</ItemSize>
        <ItemColor>Color: {item.color}</ItemColor>
        <UnitCost>Unit Cost: ${item.price}</UnitCost>
        <Quantity>Quantity: {item.quantity}</Quantity>
        <ItemSubTotal>Sub-total: ${(item.price * item.quantity).toFixed(2)}</ItemSubTotal>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
 