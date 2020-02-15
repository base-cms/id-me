const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const { tokenService } = require('@identity-x/service-clients');

const findByEmail = require('./find-by-email');

module.exports = async ({ token, fields } = {}) => {
  if (!token) throw createRequiredParamError('token');
  try {
    const verified = await tokenService.request('verify', { sub: 'user-auth', token });
    const { aud: email } = verified;
    if (!email) throw createError(400, 'No email address was provided in the token payload');

    const user = await findByEmail({ email, fields });
    if (!user) throw createError(404, `No user was found for '${email}'`);
    if (user.email !== email) throw createError(401, 'The user email does not match the token email.');

    return { user, token: verified };
  } catch (e) {
    throw createError(401, e.message);
  }
};
