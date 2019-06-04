const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const { tokenService } = require('@base-cms/id-me-service-clients');

module.exports = async ({ applicationId, token } = {}) => {
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!token) throw createRequiredParamError('token');

  const { jti, iss } = await tokenService.request('verify', { sub: 'app-user-auth', token });
  if (!jti) throw createError(400, 'No token identifier was provided.');
  if (iss !== applicationId) throw createError(400, 'The requested application ID does not match the token payload');

  // Invalidate the login link token.
  tokenService.request('invalidate', { jti });

  return 'ok';
};
