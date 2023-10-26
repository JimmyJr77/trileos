import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Home from './components/Home';
import Footer from './components/Footer';
import GlobalStyles from './styles/GlobalStyles';
import Apparel from './components/Apparel';
import Cart from './components/Cart';
import { PopupContainer, PopupMessage, PopupCloseButton } from './styles/PopupStyles';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [popup, setPopup] = useState(null);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
    setPopup(`${item.product} added to cart (Qty: ${item.quantity})`);
    setTimeout(() => setPopup(null), 3000); // Hide popup after 3 seconds
  };

  const closePopup = () => {
    setPopup(null);
  };

  return (
    <div className="App">
      {popup && (
        <PopupContainer show={Boolean(popup)}>
          <PopupMessage>{popup}</PopupMessage>
          <PopupCloseButton onClick={closePopup}>×</PopupCloseButton>
        </PopupContainer>
      )}
      <Router>
        <Header cartItemCount={cartItems.length} />
        <main>
          <div>
            <GlobalStyles />
            <Routes>
              <Route path="/" element={<Home />} index />
              <Route path="/apparel" element={<Apparel addToCart={addToCart} />} />
              <Route path="/cart" element={<Cart cartItems={cartItems} />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
