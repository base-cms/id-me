const client = require('./client');
const { REDIS_DSN } = require('../env');

const options = { url: REDIS_DSN };

module.exports = client(options);
