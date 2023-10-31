const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const secret = process.env.JWT_SECRET || 'SUPER SECRET SECRET';
const expiration = process.env.JWT_EXPIRES_IN || '1h';

function signToken(payload) {
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

// // Define your admin user data (for development purposes)
// const adminUser = {
//   email: 'admin@example.com',
//   _id: 'admin_user_id', // Replace with the actual user ID
//   isAdmin: true, // Set this to true for admin users
// };

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
    const authHeader = req.headers.authorization;
    const authHeaderParts = authHeader ? authHeader.split(' ') : [];
    const token = authHeaderParts.length === 2 ? authHeaderParts[1] : undefined;
  
    // If no token is found, return the original request
    if (!token) {
      return { user: null };
    }
  
    // If a token is found, verify it and add the user data to the context
    try {
      const { data } = jwt.verify(token, secret);
      return { user: data };
    } catch (err) {
      console.error('Invalid token');
      throw new AuthenticationError('Invalid/Expired token');
    }
  },
  signToken,
  generateAuthToken,
};
  