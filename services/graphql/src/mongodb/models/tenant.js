const connection = require('../connections/core');
const schema = require('../schema/tenant');

module.exports = connection.model('tenant', schema);
