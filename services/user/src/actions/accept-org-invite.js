const orgService = require('@base-cms/id-me-organization-client');
const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const findByEmail = require('./find-by-email');
const { OrgMembership, OrgInvitation } = require('../mongodb/models');

module.exports = async ({
  organizationId,
  email,
}) => {
  if (!organizationId) throw createRequiredParamError('organizationId');
  if (!email) throw createRequiredParamError('email');

  const [org, membership, invite, user] = await Promise.all([
    orgService.request('findById', { id: organizationId, fields: ['id', 'name'] }),
    OrgMembership.findFor(organizationId, email, ['id']),
    OrgInvitation.findFor(organizationId, email, ['organizationId', 'email', 'role']),
    findByEmail({ email, fields: ['email'] }),
  ]);

  if (!org) throw createError(404, `No organization was found for '${organizationId}'`);
  if (!user) throw createError(404, `No user was found for '${email}'`);
  if (!invite) throw createError(404, `No invitation to ${org.name} was found for ${email}.`);
  if (membership) throw createError(400, `This user is already a member of ${org.name}.`);

  const member = new OrgMembership({
    organizationId,
    email: user.email,
    role: invite.role,
  });
  await member.save();
  await OrgInvitation.remove({ email: user.email, organizationId });
  return 'ok';
};
