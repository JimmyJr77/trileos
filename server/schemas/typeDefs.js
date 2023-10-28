const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Product {
    _id: ID
    name: String
    description: String
    price: Float
    imageUrl: [String]
    variations: [ProductVariant]
  }

  type ProductVariant {
    size: String
    color: String
    stockCount: Int
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  input ProductInput {
    _id: ID
    name: String
    description: String
    price: Float
    imageUrl: [String]
    variations: [ProductVariantInput]
  }

  input ProductVariantInput {
    size: String
    color: String
    stockCount: Int
  }

  input OrderInput {
    products: [ProductInput]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    userName: String
    phoneNumber: String
    orders: [Order]
    isAdmin: Boolean  # isAdmin field indicates admin privileges
  }

  input UserInput {
    _id: ID
    firstName: String
    lastName: String
    email: String
    userName: String
    phoneNumber: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    getProducts: [Product]
    getUser: User
    getAdminUserData: User
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
