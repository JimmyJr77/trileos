import React from 'react';
import ProductContainer from './ProductContainer.js';
import { ApparelTitle, ApparelContainer } from '../styles/ApparelStyles';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../utils/queries';

function Apparel({ addToCart }) {
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const productData = data?.getProducts || [];

  return (
    <ApparelContainer>
      <ApparelTitle>Dangerous Boys Collection</ApparelTitle>
      {productData.map((product) => (
        <ProductContainer key={product._id} product={product} addToCart={addToCart} />
      ))}
    </ApparelContainer>
  );
}
export default Apparel;

