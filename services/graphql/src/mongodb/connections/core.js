const mongoose = require('mongoose');
const env = require('../../env');
const { name, version } = require('../../../package.json');

const { CORE_DSN } = env;

const connection = mongoose.createConnection(CORE_DSN, {
  // autoIndex: env.NODE_ENV !== 'production',
  appname: `${name} v${version}`,
  bufferMaxEntries: 0, // Default -1
  ignoreUndefined: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

module.exports = connection;
