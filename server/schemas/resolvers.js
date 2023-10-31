const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Order } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    getAdminUserData: async (_, __, context) => {
      console.log('Resolving getAdminUserData...');
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }

      if (!context.user.isAdmin) {
        throw new AuthenticationError('Admin access required');
      }

      try {
        const adminUserData = await User.findOne({ email: 'admin@example.com' });
        console.log('Admin User Data:', adminUserData);
        if (!adminUserData) {
          throw new Error('Admin user not found');
        }
        return adminUserData;
      } catch (error) {
        console.error('Error in getAdminUserData:', error);
        throw new Error('Failed to fetch admin user data');
      }
    },
    getProducts: async () => {
      console.log('Resolving getProducts...');
      try {
        const products = await Product.find({}).select('-__v');
        console.log('Fetched Products:', products);
        return products;
      } catch (error) {
        console.error('Error in getProducts:', error);
        throw new Error('Failed to fetch products');
      }
    },
    getUsers: async (_, __, context) => {
      console.log('Resolving getUsers...');
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }

      if (!context.user.isAdmin) {
        throw new AuthenticationError('Admin access required');
      }

      try {
        const users = await User.find().select('-password -__v');
        console.log('Fetched Users:', users);
        return users;
      } catch (error) {
        console.error('Error in getUsers:', error);
        throw new Error('Failed to fetch users');
      }
    },
  },

  Product: {
    variations: async (parent) => {
      console.log('Resolving Product.variations for Product ID:', parent._id);
      return parent.variations;
    },
  },

  Order: {
    products: async (parent) => {
      console.log('Resolving Order.products for Order ID:', parent._id);
      try {
        // Retrieve and return the product data based on the `products` array in the Order model
        const productIds = parent.products.map((product) => product.product._id);
        const products = await Product.find({ _id: { $in: productIds } }).select('-__v');
        console.log('Fetched Products for Order:', products);
        return products;
      } catch (error) {
        console.error('Error in Order.products:', error);
        throw new Error('Failed to fetch order products');
      }
    },
  },

  Mutation: {
    addUser: async (_, { userData }) => {
      console.log('Resolving addUser with userData:', userData);
      try {
        const user = await User.create(userData);
        if (!user) {
          throw new Error('User could not be created');
        }
        const token = signToken(user);
        console.log('User Created:', user);
        return { token, user };
      } catch (error) {
        console.error('Error in addUser:', error);
        throw new Error('Failed to create user');
      }
    },

    login: async (_, { email, password }) => {
      console.log('Resolving login with email:', email);
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
        console.log('Login Success for user:', user);
        return { token, user };
      } catch (error) {
        console.error('Error in login:', error);
        throw AuthenticationError('Failed to login');
      }
    },

    createOrder: async (_, { orderData }, context) => {
      console.log('Resolving createOrder with orderData:', orderData);
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      try {
        // Validate the product availability and gather product IDs
        const productIds = orderData.products.map((product) => product._id);
        const availableProducts = await Product.find({
          _id: { $in: productIds },
          'variations.stockCount': { $gte: 1 },
        });

        // Create the order
        const order = await Order.create({ products: orderData.products });
        console.log('Order Created:', order);
        return order;
      } catch (error) {
        console.error('Error in createOrder:', error);
        throw new Error('Failed to create order');
      }
    },

    updateUser: async (_, { userId, userData }, context) => {
      console.log('Resolving updateUser for userId:', userId, 'with userData:', userData);
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      if (context.user._id.toString() !== userId.toString()) {
        throw new AuthenticationError('You can only update your own profile!');
      }      

      try {
        const updatedUser = await User.findByIdAndUpdate(userId, { $set: userData }, { new: true, runValidators: true });
        if (!updatedUser) {
          throw new Error('User not found');
        }
        console.log('User Updated:', updatedUser);
        return updatedUser;
      } catch (error) {
        console.error('Error in updateUser:', error);
        throw new Error('Failed to update user');
      }
    },

    updateProduct: async (_, { productId, productData }, context) => {
      console.log('Resolving updateProduct for productId:', productId, 'with productData:', productData);
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      if (!context.user.isAdmin) {
        throw new AuthenticationError('Admin access required');
      }

      try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, { $set: productData }, { new: true, runValidators: true });
        if (!updatedProduct) {
          throw new Error('Product not found');
        }
        console.log('Product Updated:', updatedProduct);
        return updatedProduct;
      } catch (error) {
        console.error('Error in updateProduct:', error);
        throw new Error('Failed to update product');
      }
    },
  },
};

module.exports = resolvers;
