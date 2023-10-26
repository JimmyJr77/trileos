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
  return (
    <CartItemContainer>
      <ItemDetails>
        <ItemName>{item.product.name}</ItemName>
        <ItemSize>Size: {item.size}</ItemSize>
        <ItemColor>Color: {item.color}</ItemColor>
        <UnitCost>Unit Cost: ${item.product.price}</UnitCost>
        <Quantity>Quantity: {item.quantity}</Quantity>
        <ItemSubTotal>Sub-total: ${item.product.price * item.quantity}</ItemSubTotal>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
