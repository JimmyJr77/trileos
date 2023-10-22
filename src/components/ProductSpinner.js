import React, { useState } from 'react';
import Product from './Apparel';
import products from '../db/products';

function ProductSpinner() {
  const [colorIndex, setColorIndex] = useState(0);
  const product = products[0]; // You can replace this with the appropriate product data

  // Handle changing to the next color
  const handleNextColor = () => {
    setColorIndex((prevIndex) => (prevIndex + 1) % product.colors.length);
  };

  return (
    <div className="product-spinner">
      <Product product={product} selectedColorIndex={colorIndex} />
      <button onClick={handleNextColor}>Next Color</button>
    </div>
  );
}

export default ProductSpinner;


