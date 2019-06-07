const { updateField, listForApp } = require('@base-cms/id-me-utils').actions;
const create = require('./create');
const findByEmail = require('./find-by-email');
const login = require('./login');
const logout = require('./logout');
const sendLoginLink = require('./send-login-link');
const verifyAuth = require('./verify-auth');

const AppUser = require('../../mongodb/models/app-user');

module.exports = {
  create,
  findByEmail,
  listForApp: ({ id, fields }) => listForApp(AppUser, { id, fields }),
  login,
  logout,
  sendLoginLink,
  updateField: params => updateField(AppUser, params),
  verifyAuth,
};
