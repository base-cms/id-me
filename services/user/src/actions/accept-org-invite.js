const tokenService = require('@base-cms/id-me-token-client');
const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const setOrgMembership = require('./set-org-membership');
const { OrgMembership, OrgInvitation } = require('../mongodb/models');
const findByEmail = require('./find-by-email');

module.exports = async ({
  organizationId,
  email,
  token,
}) => {
  if (!organizationId) throw createRequiredParamError('organizationId');
  if (!email) throw createRequiredParamError('email');
  if (!token) throw createRequiredParamError('token');

  const [membership, invite, user] = await Promise.all([
    OrgMembership.findFor(organizationId, email, ['id']),
    OrgInvitation.findFor(organizationId, email, ['organizationId', 'email', 'role']),
    findByEmail({ email, fields: ['id', 'email'] }),
  ]);

  if (!user) throw createError(404, `No user was found for ${email}`);
  if (!invite) throw createError(404, `No invitation to this organization was found for ${email}.`);
  if (membership) throw createError(400, 'This user is already a member of this organization.');

  const { aud, jti } = await tokenService.request('verify', { sub: 'invite-user-to-org', token });
  if (!aud) throw createError(400, 'No email address was provided in the token payload');
  if (user.email !== aud) throw createError(403, 'The user email does not match the token email.');

  await setOrgMembership({ organizationId, email, role: invite.role });

  // Remove the invitation (but do not await)
  OrgInvitation.remove({ email: user.email, organizationId });

  // Invalidate the login link token (but do not await)
  tokenService.request('invalidate', { jti });
  return 'ok';
};
