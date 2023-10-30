import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../utils/queries';
import ProductContainer from './ProductContainer';
import { ApparelContainer, ApparelTitle } from '../styles/ApparelStyles';
import { useCart } from './CartContext';

function Apparel() {
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const { addToCart } = useCart(); // Get addToCart from CartContext

  if (loading) return <div>Loading...</div>;

  const productData = data?.getProducts || [];
  if (!productData.length) return <div>No products found</div>;

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


