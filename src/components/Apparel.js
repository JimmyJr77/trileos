import React from 'react';
import products from '../db/products.js'; 
import ProductContainer from './ProductContainer.js';
import { ApparelTitle, ApparelContainer } from '../styles/ApparelStyles';

function Apparel() {
  return (
    <ApparelContainer>
      <ApparelTitle>Dangerous Boys Collection</ApparelTitle>
      {products.map((product) => (
        <ProductContainer key={product.id} product={product} />
      ))}
    </ApparelContainer>
  );
}

export default Apparel;

