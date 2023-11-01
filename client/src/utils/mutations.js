import { gql } from '@apollo/client';

// Mutation to add a new user
export const ADD_USER = gql`
  mutation AddUser($userData: UserInput!) {
    addUser(userData: $userData) {
      token
      user {
        _id
        email
        userName
        isAdmin
      }
    }
  }
`;

// Mutation to log in
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        userName
        isAdmin
      }
    }
  }
`;

// Mutation to create a new order (requires authentication)
export const CREATE_ORDER = gql`
  mutation CreateOrder($orderData: OrderInput!) {
    createOrder(orderData: $orderData) {
      _id
      products {
        _id
        name
        description
        price
        productImage
        variations {
          _id
          size
          color
          stockCount
        }
      }
    }
  }
`;

// Mutation to update user information (requires authentication)
export const UPDATE_USER = gql`
  mutation UpdateUser($userData: UserInput!) {
    updateUser(userData: $userData) {
      _id
      email
      userName
      isAdmin
    }
  }
`;

// Mutation to update product information (requires admin privileges)
export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($productId: ID!, $productData: ProductInput!) {
    updateProduct(productId: $productId, productData: $productData) {
      _id
      name
      description
      price
      variations {
        _id
        size
        color
        stockCount
      }
    }
  }
`;
 