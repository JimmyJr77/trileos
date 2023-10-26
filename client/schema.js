// schema.js
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
const apolloserver = require('apollo-server');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'test',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => 'test',
      },
    },
  }),
});

module.exports = schema;