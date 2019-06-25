const actions = require('./actions');
const buildRegex = require('./build-regex');
const createLoginToken = require('./create-login-token');
const mongoose = require('./mongoose');
const normalizeEmail = require('./nomalize-email');

module.exports = {
  actions,
  buildRegex,
  createLoginToken,
  mongoose,
  normalizeEmail,
};
