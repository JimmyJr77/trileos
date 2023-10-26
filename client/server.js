const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error(`MongoDB connection error: ${error}`);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});
const app = express();

// Define GraphQL schema (replace with your schema)
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => 'Hello, GraphQL World!',
      },
    },
  }),
});

// Set up a GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true, // Enable the GraphiQL interactive query interface
}));

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/graphql`);
});