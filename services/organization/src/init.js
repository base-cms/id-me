const { start } = require('@identity-x/utils').mongoose;
const connection = require('./mongodb/connection');
const models = require('./mongodb/models');

module.exports = start({ connection, models });
