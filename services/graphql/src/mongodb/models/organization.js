const connection = require('../connection');
const schema = require('../schema/organization');

module.exports = connection.model('organization', schema);
