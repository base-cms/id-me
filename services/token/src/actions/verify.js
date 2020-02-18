const jwt = require('jsonwebtoken');
const { createError } = require('micro');
const { service } = require('@base-cms/micro');
const Token = require('../mongodb/models/token');
const { TOKEN_SECRET } = require('../env');

const { createRequiredParamError } = service;

/**
 * Verifies the provided encoded token.
 *
 * @param {object} params
 * @param {string} params.token The encoded JWT value.
 * @param {string} params.sub The token subject.
 */
module.exports = async ({ token, sub }) => {
  if (!token) throw createRequiredParamError('token');
  if (!sub) throw createRequiredParamError('sub');

  try {
    // Verify the token signature.
    const verified = jwt.verify(token, TOKEN_SECRET, { algorithms: ['HS256'] });
    // Ensure the token exists in the db and matches the subject.
    const { jti } = verified;
    const doc = await Token.findById(jti);
    if (!doc) throw createError(404, 'No token was found for the provided token identifier.');
    if (sub !== doc.sub) throw createError(400, 'The token subject does not match.');
    return verified;
  } catch (e) {
    const { message } = e;
    switch (e.message) {
      case 'invalid signature':
        throw createError(400, message);
      case 'jwt expired':
        throw createError(401, message);
      case 'jwt malformed':
        throw createError(422, message);
      default:
        throw e;
    }
  }
};
