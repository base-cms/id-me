const { start } = require('@base-cms/id-me-utils').mongoose;
const connection = require('./mongodb/connection');
const models = require('./mongodb/models');

module.exports = start({ connection, models });
