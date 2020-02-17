const { ping } = require('@identity-x/utils').mongoose;
const connection = require('./mongodb/connection');
const pkg = require('../package.json');

module.exports = ping({ connection, pkg });
