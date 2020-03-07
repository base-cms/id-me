const {
  findById,
  find,
  listForApp,
  matchForApp,
} = require('@identity-x/utils').actions;
const create = require('./create');
const CommentStream = require('../../mongodb/models/comment-stream');

module.exports = {
  create,
  find: ({ query, fields }) => find(CommentStream, { query, fields }),
  findById: ({ id, fields }) => findById(CommentStream, { id, fields }),
  listForApp: params => listForApp(CommentStream, params),
  matchForApp: params => matchForApp(CommentStream, params),
};