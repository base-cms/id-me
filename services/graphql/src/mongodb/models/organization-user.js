const connection = require('../connection');
const schema = require('../schema/organization-user');

module.exports = connection.model('organization-user', schema);
