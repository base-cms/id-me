const connection = require('../connection');
const schema = require('../schema/token');

module.exports = connection.model('token', schema);
