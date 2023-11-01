import React from 'react';
import { useCart } from './CartContext';
import { HeaderContainer, Logo, Nav, Title, CartCount } from '../styles/HeaderStyles';
import crest from '../assets/images/3lions_crest.png';
import { Link } from 'react-router-dom';

function Header({ loggedIn, setLoggedIn }) {
    const { cartItems } = useCart() || {};
    const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    
  // Check if the user is authenticated (has a token)
//   const isAuthenticated = !!localStorage.getItem('id_token');

  return (
    <HeaderContainer>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Logo src={crest} alt="Three Lions Logo" />
        <Title>TRILEOS APPAREL</Title>
      </div>
      <Nav>
        <Link to="/">Home</Link>
        <Link to="/apparel">Apparel</Link>
        {loggedIn ? ( // Check if the user is logged in
          <>
            <Link to="/myorders">Orders</Link>
            <Link
              to="/"
              onClick={() => {
                // Handle logout and clear user token
                localStorage.removeItem('id_token');
                setLoggedIn(false);
              }}
            >
              Logout
            </Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <Link to="/cart">Cart{cartItemCount > 0 && <CartCount>{cartItemCount}</CartCount>}</Link>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
 