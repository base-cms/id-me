const jwt = require('jsonwebtoken');
const { createError } = require('micro');
const { service } = require('@base-cms/micro');

const { createRequiredParamError } = service;

/**
 * Verifies the provided encoded token.
 *
 * @param {object} params
 * @param {string} params.action The corresponding action for the token.
 * @param {string} params.encoded The encoded JWT value.
 * @param {string} params.secret The secret used to sign the JWT.
 */
module.exports = async ({ action, encoded, secret }) => {
  if (!action) throw createRequiredParamError('action');
  if (!encoded) throw createRequiredParamError('encoded');
  if (!secret) throw createRequiredParamError('secret');

  try {
    const verified = jwt.verify(encoded, secret, { algorithms: ['HS256'] });
    return verified;
  } catch (e) {
    const { message } = e;
    switch (e.message) {
      case 'invalid signature':
        throw createError(400, message);
      case 'jwt expired':
        throw createError(400, message);
      case 'jwt malformed':
        throw createError(422, message);
      default:
        throw e;
    }
  }
};
