const tokenService = require('@base-cms/id-me-token-client');
const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const findByEmail = require('./find-by-email');

module.exports = async ({ token } = {}) => {
  if (!token) throw createRequiredParamError('token');

  const { sub, email } = await tokenService.request('verify', { token });
  console.log(sub);
  if (sub !== 'user-authentication') throw createError(400, 'Token subject mismatch encountered.');
  if (!email) throw createError(400, 'No email address was provided in the token payload');

  const user = await findByEmail({ email, fields: ['id', 'email'] });
  if (!user) throw createError(404, `No user was found for '${email}'`);

  return 'ok';
};
