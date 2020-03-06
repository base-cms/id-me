const connection = require('../connection');
const schema = require('../schema/comment-stream');

module.exports = connection.model('comment-stream', schema);
