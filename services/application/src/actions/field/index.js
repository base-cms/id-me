const {
  listForApp,
  matchForApp,
} = require('@identity-x/utils').actions;
const create = require('./create');
const Field = require('../../mongodb/models/field');

module.exports = {
  create,
  listForApp: params => listForApp(Field, params),
  matchForApp: params => matchForApp(Field, params),
};
