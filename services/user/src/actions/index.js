const create = require('./create');
const findByEmail = require('./find-by-email');
const login = require('./login');
const logout = require('./logout');
const sendLoginLink = require('./send-login-link');
const updateField = require('./update-field');
const verifyAuth = require('./verify-auth');

module.exports = {
  create,
  findByEmail,
  login,
  logout,
  sendLoginLink,
  updateField,
  verifyAuth,
};
