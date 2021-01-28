const connection = require('../../connection');
const schema = require('../../schema/field');

module.exports = connection.model('field', schema);
