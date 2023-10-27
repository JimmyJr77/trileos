const { AuthenticationError } = require('apollo-server-express');
const mongoose = require('mongoose');
const { User, Product, Order } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
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
        // Here you should validate the product availability
        // This would depend on your Product model

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
