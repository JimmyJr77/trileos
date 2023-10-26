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

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

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
    <ApolloProvider client = {client}> 
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
    </ApolloProvider>
  );
}

export default App;
