const connection = require('../connection');
const schema = require('../schema/app-user-login');

module.exports = connection.model('app-user-login', schema);
