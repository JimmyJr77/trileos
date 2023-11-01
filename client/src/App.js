import React, { useState, createContext, useContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import Header from "./components/Header";
import Home from './components/Home';
import Footer from './components/Footer';
import GlobalStyles from './styles/GlobalStyles';
import Apparel from './components/Apparel';
import Cart from './components/Cart';
import { PopupContainer, PopupMessage, PopupCloseButton } from './styles/PopupStyles';
import Login from './components/Login';
import authService from './utils/auth';
// import MyOrders from './components/MyOrders';
// import { jwtDecode } from 'jwt-decode';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

// Create a context for cart items and popup
const CartContext = createContext();

// Create a hook to use the cart context
export const useCart = () => useContext(CartContext);

// Define the http link for Apollo Client
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI || '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// Initialize Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [popup, setPopup] = useState(null);
  // const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('id_token')); // Check if user is logged in
  // const [loggedIn, setLoggedIn] = useState(authService.loggedIn()); // Set based on authService

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
    setPopup(`${item.product} added to cart (Qty: ${item.quantity})`);
    setTimeout(() => setPopup(null), 3000);
  };

  const closePopup = () => {
    setPopup(null);
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (authService.loggedIn()) {
      // Set the authenticated state to true
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <CartContext.Provider value={{ cartItems, addToCart }}>
        <div className="App">
          {popup && (
            <PopupContainer show={Boolean(popup)}>
              <PopupMessage>{popup}</PopupMessage>
              <PopupCloseButton onClick={closePopup}>×</PopupCloseButton>
            </PopupContainer>
          )}
          <GlobalStyles />
          <Router>
            <Header loggedIn={isAuthenticated} setLoggedIn={setIsAuthenticated} />
            <main>
              <div>
                <Routes>
                  <Route path="/" element={<Home />} index />
                  <Route path="/apparel" element={<Apparel />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route
                    path="/login"
                    element={<Login setIsAuthenticated={setIsAuthenticated} />}
                  />
                  {/* Add a route for redirecting to "Apparel" after successful login */}
                  <Route
                    path="/login/success"
                    element={<Navigate to="/apparel" replace />}
                  />
                </Routes>
              </div>
            </main>
            <Footer />
          </Router>
        </div>
      </CartContext.Provider>
    </ApolloProvider>
  );
}

export default App;

  