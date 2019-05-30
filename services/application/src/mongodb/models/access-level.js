const connection = require('../connection');
const schema = require('../schema/access-level');

module.exports = connection.model('access-level', schema);
