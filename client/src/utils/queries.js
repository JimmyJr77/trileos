import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query GetUser {
    getUser {
      _id
      username
      email
      orders {
        _id
        products {
          _id
          name
          price
          quantity
          color
          size
        }
      }
    }
  }
`;

// Get individual products
export const QUERY_PRODUCT = gql`
  query getProduct($productId: ID!) {
    getProduct(productId: $productId) {
      _id
      name
      description
      price
      size
      stockCount
      color
      imageUrl
    }
  }
`;


// Get all products
export const QUERY_PRODUCTS = gql`
  query getProducts {
    getProducts {
      _id
      name
      description
      price
      size
      stockCount
      color
      imageUrl
    }
  }
`;
