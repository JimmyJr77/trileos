import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($userId: ID!, $username: String, $email: String) {
    updateUser(userId: $userId, username: $username, email: $email) {
      _id
      username
      email
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder($orderData: OrderInput!) {
    createOrder(orderData: $orderData) {
      _id
      email
      products {
        _id
        name
        price
        size
        quantity
        color
      }
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($orderId: ID!, $orderData: OrderInput!) {
    updateOrder(orderId: $orderId, orderData: $orderData) {
      _id
      email
      products {
        _id
        name
        price
        size
        quantity
        color
      }
    }
  }
`;
