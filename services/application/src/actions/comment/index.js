const {
  findById,
  find,
  listForApp,
  matchForApp,
  updateFieldWithApp,
} = require('@identity-x/utils').actions;
const banForUser = require('./ban-for-user');
const create = require('./create');
const listForStream = require('./list-for-stream');
const Comment = require('../../mongodb/models/comment');

module.exports = {
  banForUser,
  create,
  listForStream,
  find: ({ query, fields }) => find(Comment, { query, fields }),
  findById: ({ id, fields }) => findById(Comment, { id, fields }),
  listForApp: params => listForApp(Comment, params),
  matchForApp: params => matchForApp(Comment, params),
  updateFieldWithApp: params => updateFieldWithApp(Comment, params),
};
