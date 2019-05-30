const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const setOrgMembership = require('./set-org-membership');
const { OrgMembership, OrgInvitation } = require('../mongodb/models');
const findByEmail = require('./find-by-email');
const deleteInvite = require('./delete-invite');

module.exports = async ({
  organizationId,
  email,
}) => {
  if (!organizationId) throw createRequiredParamError('organizationId');
  if (!email) throw createRequiredParamError('email');

  const [membership, invite, user] = await Promise.all([
    OrgMembership.findFor(organizationId, email, ['id']),
    OrgInvitation.findFor(organizationId, email, ['organizationId', 'email', 'role']),
    findByEmail({ email, fields: ['id', 'email'] }),
  ]);

  if (!user) throw createError(404, `No user was found for ${email}`);
  if (!invite) throw createError(404, `No invitation to this organization was found for ${email}.`);
  if (membership) throw createError(400, 'This user is already a member of this organization.');

  await setOrgMembership({ organizationId, email, role: invite.role });

  // Remove the invitation (but do not await)
  deleteInvite({ email: user.email, organizationId });

  return 'ok';
};
