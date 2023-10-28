require(dotenv).config();

const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const stripeApp = express();
const app = express();

stripeApp.use(express.json());



const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Pants" }],
  [2, { priceInCents: 20000, name: "Polo" }],
  ]);

  app.listen(3000);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: authMiddleware, // IS THIS NEEDED HERE?
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, {
    path: '/graphql',
    context: authMiddleware, // Provide context here
  }));

  // Serve static assets in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build'))); // CHECK THIS PATH FOR PROD

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html')); // CHECK THIS PATH FOR PROD
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
