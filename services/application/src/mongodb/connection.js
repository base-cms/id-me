const mongoose = require('mongoose');
const { createConnection } = require('@base-cms/id-me-utils').mongoose;
const env = require('../env');
const pkg = require('../../package.json');

const { MONGO_DSN } = env;

module.exports = createConnection({
  mongoose,
  pkg,
  dsn: MONGO_DSN,
});
