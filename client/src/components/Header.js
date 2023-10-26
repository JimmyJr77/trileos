import React from 'react';
import { HeaderContainer, Logo, Nav, Title, CartCount } from '../styles/HeaderStyles'; // Import CartCount
import crest from '../assets/images/3lions_crest.png';
import { Link } from 'react-router-dom';

function Header({ cartItemCount }) { // Receive cartItemCount as prop
    return (
        <HeaderContainer>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Logo src={crest} alt="Three Lions Logo" />
                <Title>TRILEOS APPAREL</Title>
            </div>
            <Nav>
                <Link to="/">Home</Link>
                <Link to="/apparel">Apparel</Link>
                <Link to="/cart">Cart{cartItemCount > 0 && <CartCount>{cartItemCount}</CartCount>}</Link>
            </Nav>
        </HeaderContainer>
    );
}

export default Header;

