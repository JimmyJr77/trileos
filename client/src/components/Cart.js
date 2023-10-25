import React, { useState } from "react";
// import products from "../db/products";
import {
    CartContainer,
    CartTitle
} from '../styles/CartStyles';

function Cart() {
    return (
        <CartContainer>
            <CartTitle>Shopping Cart</CartTitle>
            <div className="cart">
                
            </div>
        </CartContainer>
    );
}

export default Cart;