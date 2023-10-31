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
    _id: ID!
    size: String
    color: String
    stockCount: Int
  }

  type OrderProduct {
    product: Product
    variant: ProductVariant
    quantity: Int
    price: Float
  }

  type Order {
    _id: ID
    products: [OrderProduct]
    totalPrice: Float
    user: User
  }

  type User {
    _id: ID
    userName: String
    email: String
    orders: [Order]
    isAdmin: Boolean
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
    _id: ID!
    size: String
    color: String
    stockCount: Int
  }
  
  input ProductOrderInput {
    productId: ID!
    variantId: ID!
    quantity: Int!
  }

  input OrderInput {
    products: [ProductOrderInput]!
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
    getUsers: [User] # Admin only
    getAdminUserData: User # Admin only
    getUserData: User # Authenticated user
    getUserOrderHistory: [Order] # Authenticated user
    getCurrentUserData: User # Authenticated user
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
