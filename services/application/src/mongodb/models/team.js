const connection = require('../connection');
const schema = require('../schema/team');

module.exports = connection.model('team', schema);
