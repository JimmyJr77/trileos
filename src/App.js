import React from 'react';
import './App.css'; // Import your CSS file or styles here
import ProductSpinner from './components/ProductSpinner';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Online Clothing Store</h1>
        {/* Add navigation links or components here */}
      </header>
      <main>
        {/* Render the ProductSpinner component to display clothing */}
        <ProductSpinner />
        {/* You can add more components/pages as needed */}
      </main>
      <footer>
        {/* Add footer content here */}
      </footer>
    </div>
  );
}

export default App;
