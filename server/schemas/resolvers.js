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
    getUserData: async (_, __, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      return context.user;
    },
    getUserOrderHistory: async (_, __, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      return Order.find({ user: context.user._id }).populate('products.product');
    },
    getCurrentUserData: async (_, __, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      return context.user;
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
        const orderProducts = await Order.findById(parent._id)
          .populate({
            path: 'products.product',
            select: '-__v',
          })
          .lean();
  
        const result = orderProducts.products.map((op) => {
          const variant = op.product.variations.id(op.variant._id);
          return {
            product: op.product,
            quantity: op.quantity,
            variant,
            price: op.price,
          };
        });
  
        console.log('Fetched Products for Order:', result);
        return result;
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
        throw new AuthenticationError('Failed to login');
      }
    },

    createOrder: async (_, { orderData }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
    
      try {
        const productsToOrder = [];
        let totalPrice = 0;
    
        for (const orderProduct of orderData.products) {
          const product = await Product.findById(orderProduct.productId);
          if (!product) {
            throw new Error(`Product with ID ${orderProduct.productId} not found`);
          }
    
          const variant = product.variations.id(orderProduct.variantId);
          if (!variant) {
            throw new Error(`Variant with ID ${orderProduct.variantId} not found in product ${product.name}`);
          }
    
          if (variant.stockCount < orderProduct.quantity) {
            throw new Error(`Not enough stock for product ${product.name}, variant ${variant.size} ${variant.color}`);
          }
    
          variant.stockCount -= orderProduct.quantity;
          totalPrice += product.price * orderProduct.quantity;
          await product.save();
    
          productsToOrder.push({
            product: product._id,
            quantity: orderProduct.quantity,
            variant: variant,
            price: product.price * orderProduct.quantity,
          });
        }
    
        const order = await Order.create({ products: productsToOrder, totalPrice, user: context.user._id });
        return order;
    
      } catch (error) {
        console.error('Error in createOrder:', error.message);
        throw new Error(error.message || 'Failed to create order');
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