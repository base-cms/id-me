const express = require('express');
const graphql = require('../graphql/server');

const app = express();
app.set('trust proxy', 'loopback, linklocal, uniquelocal');

graphql({ app, path: '/' });

module.exports = app;
