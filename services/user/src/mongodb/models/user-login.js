const connection = require('../connection');
const schema = require('../schema/user-login');

module.exports = connection.model('user-login', schema);
