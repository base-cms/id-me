const tokenService = require('@base-cms/id-me-token-client');
const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const findByEmail = require('./find-by-email');

module.exports = async ({ token } = {}) => {
  if (!token) throw createRequiredParamError('token');
  try {
    const verified = await tokenService.request('verify', { sub: 'user-auth', token });
    const { aud: email } = verified;
    if (!email) throw createError(400, 'No email address was provided in the token payload');

    const user = await findByEmail({ email, fields: ['id', 'email'] });
    if (!user) throw createError(404, `No user was found for '${email}'`);

    return verified;
  } catch (e) {
    throw createError(401, e.message);
  }
};
