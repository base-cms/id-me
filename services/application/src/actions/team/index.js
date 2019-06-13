const { findById, find, listForApp } = require('@base-cms/id-me-utils').actions;
const create = require('./create');
const findByIp = require('./find-by-ip');
const Team = require('../../mongodb/models/team');

module.exports = {
  create,
  find: ({ query, fields }) => find(Team, { query, fields }),
  findById: ({ id, fields }) => findById(Team, { id, fields }),
  findByIp,
  listForApp: ({ id, fields }) => listForApp(Team, { id, fields }),
};
