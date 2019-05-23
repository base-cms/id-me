const mongoose = require('mongoose');
const env = require('../../env');
const { name, version } = require('../../../package.json');

const DB_PREFIX = '/id-me';
const { TENANT_DSN, TENANT_KEY } = env;

const instanceDSN = TENANT_DSN.replace(DB_PREFIX, `${DB_PREFIX}-${TENANT_KEY}`);

const connection = mongoose.createConnection(instanceDSN, {
  // autoIndex: env.NODE_ENV !== 'production',
  appname: `${name} v${version}`,
  bufferMaxEntries: 0, // Default -1
  ignoreUndefined: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
module.exports = connection;
