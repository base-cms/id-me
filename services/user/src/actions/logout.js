const tokenService = require('@base-cms/id-me-token-client');
const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;

module.exports = async ({ token } = {}) => {
  if (!token) throw createRequiredParamError('token');

  const { jti } = await tokenService.request('verify', { sub: 'user-auth', token });
  if (!jti) throw createError(400, 'No token identifier was provided.');

  // Invalidate the login link token.
  tokenService.request('invalidate', { jti });

  return 'ok';
};
