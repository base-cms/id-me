const {
  findById,
  find,
  listForApp,
  matchForApp,
} = require('@identity-x/utils').actions;
const create = require('./create');
const Comment = require('../../mongodb/models/comment');

module.exports = {
  create,
  find: ({ query, fields }) => find(Comment, { query, fields }),
  findById: ({ id, fields }) => findById(Comment, { id, fields }),
  listForApp: params => listForApp(Comment, params),
  matchForApp: params => matchForApp(Comment, params),
};
