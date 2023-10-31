import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../utils/queries';
import ProductContainer from './ProductContainer';
import { ApparelContainer, ApparelTitle } from '../styles/ApparelStyles';
import { useCart } from './CartContext';

function Apparel() {
  const { loading, data } = useQuery(GET_PRODUCTS);
  const { addToCart } = useCart(); // Get addToCart from CartContext

  console.log('Apparel component: Start rendering...');

  if (loading) {
    console.log('Apparel component: Loading...');
    return <div>Loading...</div>;
  }

  const productData = data?.getProducts || [];
  if (!productData.length) {
    console.log('Apparel component: No products found');
    return <div>No products found</div>;
  }

  console.log('Apparel component: Products data', productData);

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



