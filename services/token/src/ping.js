const { ping } = require('@base-cms/id-me-utils').mongoose;
const connection = require('./mongodb/connection');
const pkg = require('../package.json');

module.exports = ping({ connection, pkg });
