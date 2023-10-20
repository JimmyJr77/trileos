import products from '../db/products';
import React, { useState } from 'react';

function Product({ product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]); // Default to the first color

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleAddToCart = () => {
    // Implement the logic to add the selected product to the cart
    // You can use state or a global state management library like Redux for this
  };

  return (
    <div className="product">
      <img src={product.imageUrl} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <label>
        Color:
        <select value={selectedColor} onChange={handleColorChange}>
          {product.colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default Product;
