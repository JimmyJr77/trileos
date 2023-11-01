import React from 'react';
import ProductContainer from './ProductContainer.js';
import { ApparelTitle, ApparelContainer } from '../styles/ApparelStyles';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../utils/queries';


function Apparel({ addToCart }) {
  const { loading, data } = useQuery(GET_PRODUCTS);
  if (loading) return <div>Loading...</div>;
  console.log(data);
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
 
