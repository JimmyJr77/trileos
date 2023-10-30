import React from 'react';
import { useCart } from './CartContext';
import { HeaderContainer, Logo, Nav, Title, CartCount } from '../styles/HeaderStyles';
import crest from '../assets/images/3lions_crest.png';
import { Link } from 'react-router-dom';

function Header() {
    const { cartItems } = useCart() || {}; // Get cartItems from CartContext
    const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0); // Calculate total cart item count
    return (
        <HeaderContainer>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Logo src={crest} alt="Three Lions Logo" />
                <Title>TRILEOS APPAREL</Title>
            </div>
            <Nav>
                <Link to="/">Home</Link>
                <Link to="/apparel">Apparel</Link>
                <Link to="/apparel">Login</Link>
                <Link to="/apparel">Logout</Link>
                <Link to="/apparel">MyOrders</Link>
                <Link to="/cart">Cart{cartItemCount > 0 && <CartCount>{cartItemCount}</CartCount>}</Link>
            </Nav>
        </HeaderContainer>
    );
}

export default Header;

