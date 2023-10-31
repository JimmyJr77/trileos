import { gql } from '@apollo/client';

// Query to fetch all products
export const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      _id
      name
      description
      price
      variations {
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
    getAdminUserData {
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

export const GET_USER_ORDER_HISTORY = gql`
  query GetUserOrderHistory {
    getAdminUserData {
      _id
      email
      userName
      isAdmin
      orders {
        _id
        products {
          _id
          name
          description
          price
          variations {
            size
            color
            stockCount
          }
        }
      }
    }
  }
`;

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
