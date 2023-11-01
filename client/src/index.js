import React from 'react';
import ReactDOM from 'react-dom/client';
import { CartProvider } from './components/CartContext';
import authService from './utils/auth';

import App from './App';

// Creating the root and rendering the App component
console.log(authService)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider authService={authService}>
      <App />
    </CartProvider>
  </React.StrictMode>
);
  