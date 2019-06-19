const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const { tokenService } = require('@base-cms/id-me-service-clients');

const { Application, AppUserLogin } = require('../../mongodb/models');
const findByEmail = require('./find-by-email');

module.exports = async ({
  applicationId,
  token,
  ip,
  ua,
} = {}) => {
  if (!token) throw createRequiredParamError('token');
  if (!applicationId) throw createRequiredParamError('applicationId');

  const app = await Application.findById(applicationId, ['id']);
  if (!app) throw createError(404, `No application was found for '${applicationId}'`);

  const {
    aud: email,
    iss,
    jti,
    fields: input = {},
  } = await tokenService.request('verify', { sub: 'app-user-login-link', token });

  if (!email) throw createError(400, 'No email address was provided in the token payload');
  if (!iss) throw createError(400, 'No application ID was provided in the token payload');
  if (iss !== applicationId) throw createError(400, 'The requested application ID does not match the token payload');

  const user = await findByEmail({ applicationId, email });
  if (!user) throw createError(404, `No user was found for '${email}'`);

  // Create the authenticated token.
  const { token: authToken, payload } = await tokenService.request('create', {
    sub: 'app-user-auth',
    iss: applicationId,
    payload: { aud: user.email },
  });

  // Invalidate the login link token (but do not await)
  tokenService.request('invalidate', { jti });

  // Save the login with the auth token ID (but do not await)
  AppUserLogin.create({
    applicationId,
    email: user.email,
    tokenId: payload.jti,
    ip,
    ua,
  });

  // Update the user with last logged in, verified, and any fields provided on the token.
  const toUpdate = Object.keys(input).filter(field => field !== 'email').reduce((o, field) => ({ ...o, [field]: input[field] }), {
    verified: true,
    lastLoggedIn: new Date(),
  });

  user.set(toUpdate);
  await user.save();

  return { user: user.toObject(), token: { id: payload.jti, value: authToken } };
};
