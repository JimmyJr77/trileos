import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Home from './components/Home';
import Footer from './components/Footer';
import GlobalStyles from './styles/GlobalStyles';
import Apparel from './components/Apparel';
import Cart from './components/Cart';
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

// Middleware function to retrieve the token from localStorage and set the request headers before making the request to the API
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,//spread operator
      authorization: token ? `Bearer ${token}` : '',//ternary operator
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
     <Router>
          <Header />
          <main>
            <div>
                <GlobalStyles />
                <Routes>
                    <Route path="/" element={<Home />} index />
                    <Route path="/apparel" element={<Apparel />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </div>
          </main>
          <Footer />
        </Router>
    </ApolloProvider>
  );
}
  


export default App;