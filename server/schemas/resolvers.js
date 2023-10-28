const { AuthenticationError } = require('apollo-server-express');
const mongoose = require('mongoose');
const { User, Product, Order } = require('../models');
const { signToken } = require('../utils/auth');
// const { GraphQLScalarType } = require('graphql');
// const { Kind } = require('graphql/language');

// // Define the custom Date scalar resolver
// const dateScalarResolver = new GraphQLScalarType({
//   name: 'Date',
//   description: 'Date custom scalar type',
//   serialize(value) {
//     // Serialize the JavaScript Date object to a string
//     return value.toISOString();
//   },
//   parseValue(value) {
//     // Parse the string back to a JavaScript Date object
//     return new Date(value);
//   },
//   parseLiteral(ast) {
//     if (ast.kind === Kind.STRING) {
//       // Parse a string literal to a JavaScript Date object
//       return new Date(ast.value);
//     }
//     return null; // Invalid input
//   },
// });

const resolvers = {
  Query: {
    getAdminUserData: async (_, __, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }

      if (!context.user.isAdmin) {
        throw new AuthenticationError('Admin access required');
      }

      try {
        const adminUserData = await fetchAdminUserData(); // Implement this function to fetch admin data
        return adminUserData;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch admin user data');
      }
    },
    getProducts: async () => {
      try {
        const products = await Product.find({}).select('-__v');
        return products;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch products');
      }
    },
    getUser: async (_, __, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      try {
        const user = await User.findById(context.user._id).populate('orders');
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch user');
      }
    },
  },

  Product: {
    variations: async (parent) => {
      return parent.variations;
    },
  },

  Order: {
    products: async (parent) => {
      try {
        // Retrieve and return the product data based on the `products` array in the Order model
        const productIds = parent.products.map((product) => product._id);
        const products = await Product.find({ _id: { $in: productIds } }).select('-__v');
        return products;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch order products');
      }
    },
  },

  Mutation: {
    addUser: async (_, { userData }) => {
      try {
        const user = await User.create(userData);
        if (!user) {
          throw new Error('User could not be created');
        }
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error(error);
        throw new Error('Failed to create user');
      }
    },

    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }

        const token = signToken(user);

        return { token, user };
      } catch (error) {
        console.error(error);
        throw new Error('Failed to login');
      }
    },

    createOrder: async (_, { orderData }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      try {
        // Validate the product availability and gather product IDs
        const productIds = orderData.products.map((product) => product._id);
        const availableProducts = await Product.find({
          _id: { $in: productIds },
          'variations.stockCount': { $gte: 1 }, // Assuming 'stockCount' is used to track product availability
        });

        if (availableProducts.length !== productIds.length) {
          throw new Error('One or more products are not available.');
        }

        // Create the order
        const order = await Order.create({ products: orderData.products });
        const user = await User.findByIdAndUpdate(context.user._id, { $push: { orders: order._id } }, { new: true });

        if (!user) {
          throw new Error('User not found');
        }

        return order;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to create order');
      }
    },
    
    // Date: dateScalarResolver,

    updateUser: async (_, { userId, userData }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      if (context.user._id.toString() !== userId) {
        throw new AuthenticationError('You can only update your own profile!');
      }

      try {
        const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
        if (!updatedUser) {
          throw new Error('User not found');
        }
        return updatedUser;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to update user');
      }
    },

    updateOrder: async (_, { orderId, orderData }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      try {
        const order = await Order.findById(orderId);
        if (!order) {
          throw new Error('Order not found');
        }
        if (order.user.toString() !== context.user._id.toString()) {
          throw new AuthenticationError('You can only update your own orders!');
        }

        const updatedOrder = await Order.findByIdAndUpdate(orderId, orderData, { new: true });
        if (!updatedOrder) {
          throw new Error('Failed to update order');
        }
        return updatedOrder;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to update order');
      }
    },
  },
};

module.exports = resolvers;
