const tokenService = require('@base-cms/id-me-token-client');
const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const findByEmail = require('./find-by-email');

module.exports = async ({ token } = {}) => {
  if (!token) throw createRequiredParamError('token');

  const { aud: email } = await tokenService.request('verify', { sub: 'user-auth', token });
  if (!email) throw createError(400, 'No email address was provided in the token payload');

  const user = await findByEmail({ email, fields: ['id', 'email'] });
  if (!user) throw createError(404, `No user was found for '${email}'`);

  return 'ok';
};
