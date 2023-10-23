import React from 'react';
import { HeaderContainer, Logo, Nav, Title } from '../styles/HeaderStyles';
import crest from '../assets/images/3lions_crest.png';

function Header() {
    return (
        <HeaderContainer>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Logo src={crest} alt="Three Lions Logo" />
                <Title>TRILEOS APPAREL</Title>
            </div>
            <Nav>
                <li>Home</li>
                <li>Apparel</li>
                <li>Cart</li>
            </Nav>
        </HeaderContainer>
    );
}

export default Header;

