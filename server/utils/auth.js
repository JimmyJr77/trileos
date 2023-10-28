const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET || 'SUPER SECRET SECRET';
const expiration = '2h';

// Define the signToken function first
function signToken(payload) {
  const tokenPayload = {
    email: payload.email,
    _id: payload._id,
    isAdmin: payload.isAdmin || false,
  };
  return jwt.sign({ data: tokenPayload }, secret, { expiresIn: expiration });
}

// Define your admin user data
const adminUser = {
  email: 'admin@example.com',
  _id: 'admin_user_id', // Replace with the actual user ID
  isAdmin: true, // Set this to true for admin users
};

// Generate an authentication token for the admin user
const adminToken = generateAuthToken(adminUser);

// Define the generateAuthToken function after signToken
function generateAuthToken(user) {
  const isAdmin = user.isAdmin || false;
  const tokenPayload = {
    _id: user._id,
    email: user.email,
    isAdmin, // Set isAdmin to true for admin users
  };
  
  const token = signToken(tokenPayload);
  return token;
}

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (err) {
      console.log('Invalid token');
    }

    return req;
  },
  signToken, // Export the signToken function
  throwAuthError: function () {
    throw new AuthenticationError('Could not authenticate user.');
  },
  generateAuthToken, // Export the generateAuthToken function
};
