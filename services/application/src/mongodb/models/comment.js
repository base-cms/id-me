const connection = require('../connection');
const schema = require('../schema/comment');

module.exports = connection.model('comment', schema);
