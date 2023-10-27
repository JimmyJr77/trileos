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

export const QUERY_PRODUCT = gql`
  query GetProduct($productId: ID!) {
    getProduct(productId: $productId) {
      _id
      name
      description
      price
      size
      quantity
      color
      images
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      _id
      name
      description
      price
      size
      quantity
      color
      images
    }
  }
`;
