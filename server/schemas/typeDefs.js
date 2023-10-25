// schema.js
// const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
// const apolloserver = require('apollo-server');

// const schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'test',
//     fields: {
//       hello: {
//         type: GraphQLString,
//         resolve: () => 'test',
//       },
//     },
//   }),
// });

// module.exports = schema;
const { gql } = require('apollo-server-express');
const typeDefs = gql`
  type Product {
    _id: ID
    name: String
    description: String
    price: Float
    size: [String]
    color: [String]
    quantity: Int
    imageUrl: [String]
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    email: String
    password: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    getProduct: [Product]
    getSingleProduct(_id: ID!): Product
    getUser: User
    getOrders(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(email: String!, password: String!): Auth
    createOrder(products: [ID]!): Order
    deleteOrder(_id: ID): Order
    updateOrder(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;