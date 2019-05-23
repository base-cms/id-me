const express = require('express');
const graphql = require('../graphql/server');

const app = express();

graphql({ app, path: '/' });

module.exports = app;
