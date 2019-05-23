const connection = require('../connection');
const schema = require('../schema/tenant');

module.exports = connection.model('tenant', schema);
