import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import statement
import { CartProvider } from './components/CartContext'; // Adjusted path
import App from './App';

// Creating the root and rendering the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
