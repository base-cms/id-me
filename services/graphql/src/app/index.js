const express = require('express');
const graphql = require('../graphql/server');
const appUserExport = require('./app-user-export');
const { TRUSTED_PROXIES } = require('../env');

const app = express();
const proxies = ['loopback', 'linklocal', 'uniquelocal'];
if (TRUSTED_PROXIES) {
  TRUSTED_PROXIES.split(',').map(p => p.trim()).filter(p => p).forEach(p => proxies.push(p));
}
app.set('trust proxy', proxies);

app.get('/export/:applicationId', appUserExport);
graphql({ app, path: '/' });

module.exports = app;
