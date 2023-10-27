const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Product {
    _id: ID
    name: String
    description: String
    price: Float
    size: [String]
    colors: [String]
    quantity: Int
    imageUrl: [String]
    stockCount: Int
  }

  input ProductInput {
    _id: ID
    name: String
    description: String
    price: Float
    size: [String]
    colors: [String]
    quantity: Int
    imageUrl: [String]
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  input OrderInput {
    products: [ProductInput]
  }

  type User {
    _id: ID
    email: String
    orders: [Order]
  }

  input UserInput {
    username: String
    email: String
    password: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    getProducts: [Product]
    getUser: User
  }

  type Mutation {
    addUser(userData: UserInput): Auth
    login(email: String!, password: String!): Auth
    createOrder(orderData: OrderInput): Order
    updateUser(userId: ID!, userData: UserInput): User
    updateOrder(orderId: ID!, orderData: OrderInput): Order
  }
`;

module.exports = typeDefs;
