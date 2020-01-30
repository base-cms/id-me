const express = require('express');
const graphql = require('../graphql/server');
const { TRUSTED_PROXIES } = require('../env');

const app = express();
const proxies = ['loopback', 'linklocal', 'uniquelocal'];
if (TRUSTED_PROXIES) {
  TRUSTED_PROXIES.split(',').map(p => p.trim()).filter(p => p).forEach(p => proxies.push(p));
}
app.set('trust proxy', proxies);

graphql({ app, path: '/' });

module.exports = app;
