require('dotenv').config({path:'../.env'});
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
// const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
console.log(process.env.PORT);
const PORT = process.env.PORT || 3000;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return authMiddleware({ req });
  },
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build'))); // CHECK THIS PATH FOR PROD
};

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html')); // CHECK THIS PATH FOR PROD
  });

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  // app.use('/graphql', expressMiddleware(server, {
  //   path: '/graphql',
  //   // context: authMiddleware, // Remove this line
  // }));

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

startApolloServer();