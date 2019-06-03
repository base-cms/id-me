const { updateField } = require('@base-cms/id-me-utils').actions;
const create = require('./create');
const findByEmail = require('./find-by-email');
const sendLoginLink = require('./send-login-link');

const AppUser = require('../../mongodb/models/app-user');

module.exports = {
  create,
  findByEmail,
  sendLoginLink,
  updateField: params => updateField(AppUser, params),
};
