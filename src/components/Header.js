import React from 'react';
import { HeaderContainer, Logo, Nav, Title } from '../styles/HeaderStyles';
import crest from '../assets/images/3lions_crest.png';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <HeaderContainer>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Logo src={crest} alt="Three Lions Logo" />
                <Title>TRILEOS APPAREL</Title>
            </div>
            <Nav>
                <Link to="/">Home</Link>
                <Link to="/apparel">Apparel</Link>
                <Link to="/cart">Cart</Link>
            </Nav>
        </HeaderContainer>
    );
}

export default Header;

