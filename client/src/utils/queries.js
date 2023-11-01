import { gql } from '@apollo/client';

// Query to fetch all products
export const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
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
`;

// Query to fetch user data (requires authentication)
export const GET_USER_DATA = gql`
  query GetUserData {
    getUserData {
      _id
      email
      userName
      isAdmin
    }
  }
`;

// Query to fetch all users (requires admin privileges)
export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      _id
      email
      userName
      isAdmin
    }
  }
`;

// Query to get the current user's order history (requires authentication)
export const GET_USER_ORDER_HISTORY = gql`
  query GetUserOrderHistory {
    getUserOrderHistory {
      _id
      products {
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
  }
`;

// Query to fetch the current user's data (requires authentication)
export const GET_CURRENT_USER_DATA = gql`
  query GetCurrentUserData {
    getCurrentUserData {
      _id
      email
      userName
      isAdmin
    }
  }
`;
 