const { ApolloServer } = require('apollo-server-express');
const ApolloNewrelicExtension = require('apollo-newrelic-extension');
const schema = require('./schema');
const context = require('./context');

const isProduction = process.env.NODE_ENV === 'production';
const { ENGINE_API_KEY } = require('../env');

module.exports = ({ app, path }) => {
  const server = new ApolloServer({
    schema,
    context,
    // Enable in production
    tracing: isProduction,
    cacheControl: isProduction,
    engine: isProduction ? { apiKey: ENGINE_API_KEY } : false,
    extensions: isProduction ? [() => new ApolloNewrelicExtension()] : [],
    // Enable in dev
    introspection: true,
    debug: !isProduction,
    playground: !isProduction ? { endpoint: path } : false,
  });
  server.applyMiddleware({ app, path });
};
