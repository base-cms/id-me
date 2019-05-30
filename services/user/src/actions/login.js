const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const { tokenService } = require('@base-cms/id-me-service-clients');

const UserLogin = require('../mongodb/models/user-login');
const findByEmail = require('./find-by-email');

module.exports = async ({
  token,
  fields,
  ip,
  ua,
} = {}) => {
  if (!token) throw createRequiredParamError('token');

  const { aud: email, jti } = await tokenService.request('verify', { sub: 'user-login-link', token });
  if (!email) throw createError(400, 'No email address was provided in the token payload');

  const user = await findByEmail({ email, fields });
  if (!user) throw createError(404, `No user was found for '${email}'`);

  // Create the authenticated token.
  const { token: authToken, payload } = await tokenService.request('create', {
    sub: 'user-auth',
    payload: { aud: user.email },
  });

  // Invalidate the login link token (but do not await)
  tokenService.request('invalidate', { jti });

  // Save the login with the auth token ID (but do not await)
  UserLogin.create({
    email: user.email,
    tokenId: payload.jti,
    ip,
    ua,
  });

  return { user: user.toObject(), token: { id: payload.jti, value: authToken } };
};
