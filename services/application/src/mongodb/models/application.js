const connection = require('../connection');
const schema = require('../schema/application');

module.exports = connection.model('application', schema);
