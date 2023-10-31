const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Product {
    _id: ID
    name: String
    description: String
    price: Float
    productImage: [String]
    variations: [ProductVariant]
  }

  type ProductVariant {
    size: String
    color: String
    stockCount: Int
  }

  type Order {
    _id: ID
    products: [Product]
  }

  type User {
    _id: ID
    userName: String
    email: String
    orders: [Order]
    isAdmin: Boolean  # isAdmin field indicates admin privileges
  }

  input ProductInput {
    _id: ID
    name: String
    description: String
    price: Float
    productImage: [String]
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

  input UserInput {
    _id: ID
    userName: String
    email: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    getProducts: [Product]
    getUsers: [User] # admin only
    getAdminUserData: User # admin only
  }

  type Mutation {
    addUser(userData: UserInput): Auth
    login(email: String!, password: String!): Auth
    createOrder(orderData: OrderInput): Order
    updateUser(userId: ID!, userData: UserInput): User
    updateOrder(orderId: ID!, orderData: OrderInput): Order
    updateProduct(productId: ID!, productData: ProductInput!): Product
  }
`;

module.exports = typeDefs;
