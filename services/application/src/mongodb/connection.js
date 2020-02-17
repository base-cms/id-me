const mongoose = require('mongoose');
const { createConnection } = require('@identity-x/utils').mongoose;
const env = require('../env');
const pkg = require('../../package.json');

const { MONGO_DSN } = env;

module.exports = createConnection({
  mongoose,
  pkg,
  dsn: MONGO_DSN,
});
