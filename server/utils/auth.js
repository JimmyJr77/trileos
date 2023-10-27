const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET || 'SUPER SECRET SECRET'; // It's better to set a default value or handle the absence of SECRET.
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
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
  signToken: function ({ email, _id }) {
    const payload = { email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  // This function can be used to throw an authentication error
  throwAuthError: function() {
    throw new AuthenticationError('Could not authenticate user.');
  }
};
