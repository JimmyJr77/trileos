const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET || 'SUPER SECRET SECRET';
const expiration = '2h';

// Define the signToken function
function signToken(payload) {
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

// Define your admin user data (for development purposes)
const adminUser = {
  email: 'admin@example.com',
  _id: 'admin_user_id', // Replace with the actual user ID
  isAdmin: true, // Set this to true for admin users
};

// Uncomment the following function if needed for other purposes
// function generateAuthToken(user) {
//   const isAdmin = user.isAdmin || false;
//   const tokenPayload = {
//     _id: user._id,
//     email: user.email,
//     isAdmin, // Set isAdmin to true for admin users
//   };
  
//   const token = signToken(tokenPayload);
//   return token;
// }

module.exports = {
  authMiddleware: function ({ req }) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return req;
    }

    const token = authHeader.replace('Bearer ', '');

    if (!token) {
      return req;
    }

    try {
      const data = jwt.verify(token, secret);
      req.user = data;
    } catch (err) {
      console.log('Invalid token');
    }

    return req;
  },
  signToken, // Export the signToken function
};
