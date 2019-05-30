const connection = require('../connection');
const schema = require('../schema/app-user');

module.exports = connection.model('app-user', schema);
