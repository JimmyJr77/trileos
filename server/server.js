const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,//gql models
  resolvers,//gql controllers
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve up static assets
  //app.use('/images', express.static(path.join(__dirname, '../client/images')));

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware ///gql auth providing user context
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();





// const express = require('express');
// const { graphqlHTTP } = require('express-graphql');
// const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
// const mongoose = require('mongoose');

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost/test', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.on('error', (error) => {
//   console.error(`MongoDB connection error: ${error}`);
// });

// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });
// const app = express();

// // Define GraphQL schema (replace with your schema)
// const schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'Query',
//     fields: {
//       hello: {
//         type: GraphQLString,
//         resolve: () => 'Hello, GraphQL World!',
//       },
//     },
//   }),
// });

// // Set up a GraphQL endpoint
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   graphiql: true, // Enable the GraphiQL interactive query interface
// }));

// // Start the server
// const port = process.env.PORT || 4000;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}/graphql`);
// });