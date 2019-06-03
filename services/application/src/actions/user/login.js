const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const { updateField } = require('@base-cms/id-me-utils').actions;
const { tokenService } = require('@base-cms/id-me-service-clients');

const AppUser = require('../../mongodb/models/app-user');
const AppUserLogin = require('../../mongodb/models/app-user-login');
const findByEmail = require('./find-by-email');

module.exports = async ({
  token,
  fields,
  ip,
  ua,
} = {}) => {
  if (!token) throw createRequiredParamError('token');

  const {
    aud: email,
    iss: applicationId,
    jti,
    fields: input = {},
  } = await tokenService.request('verify', { sub: 'app-user-login-link', token });

  if (!email) throw createError(400, 'No email address was provided in the token payload');
  if (!applicationId) throw createError(400, 'No application ID was provided in the token payload');

  const user = await findByEmail({ applicationId, email, fields });
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

  // Update any fields provided with the token.
  Object.keys(input).filter(field => field !== 'email').map(field => updateField(AppUser, { id: user._id, path: field, value: input[field] }));

  return { user: user.toObject(), token: { id: payload.jti, value: authToken } };
};
