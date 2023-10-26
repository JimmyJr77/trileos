const { AuthenticationError, signToken } = require('apollo-server-express');
const { User, Product, Order } = require('../models');


const resolvers = {
    Query: {
      getProducts: async (parent, args) => {
        // Implement logic to fetch a product by ID
        if (parent) {
          const productData = await Product.find({}).select('-__v');
        } 
      },
       //getSingleProduct if that's what you guys decide
      // getUser: async (parent, args, context) => {
      //   // Implement logic to fetch a user by ID
      //   if (context.user) {
      //     const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
  
      //     return userData;
      //   }
  
      //   throw AuthenticationError;
      // },
      // getOrders: (parent, args, context) => {
      //   // Implement logic to fetch all orders
      // },
     
    },
    // Mutation: {
    //   addUser: async (parent, args) => {
    //     const user = await User.create(args);
    //     const token = signToken(user);
  
    //     return { token, user };
    //   },

    //   login: async (parent, { email, password }) => {
    //     const user = await User.findOne({ email });
  
    //     if (!user) {
    //       throw AuthenticationError;
    //     }
  
    //     const correctPw = await user.isCorrectPassword(password);
  
    //     if (!correctPw) {
    //       throw AuthenticationError;
    //     }
  
    //     const token = signToken(user);
  
    //     return { token, user };
    //   },

    //   createOrder: (parent, args, context) => {
    //     // Implement logic to create a new order
    //   },
    //   updateOrder: (parent, args, context) => {
    //     // Implement logic to update an order
    //   },
    //   deleteOrder: (parent, args, context) => {
    //     // Implement logic to delete an order
    //   },
    // },
  };


  module.exports = resolvers;