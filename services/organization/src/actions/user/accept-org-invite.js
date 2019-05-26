const { createError } = require('micro');
const {
  OrgMembership,
  OrgInvitation,
} = require('../../mongodb/models');
const Organization = require('../organization');
const findByEmail = require('./find-by-email');
const validateParams = require('../validate-required-params');

module.exports = async ({
  organizationId,
  email,
}) => {
  validateParams({
    organizationId,
    email,
  });

  const [org, membership, invite, user] = await Promise.all([
    Organization.findById({ id: organizationId, fields: ['id', 'name'] }),
    OrgMembership.findOne({ email, organizationId }, { _id: 1 }),
    OrgInvitation.findOne({ email, organizationId }, ['organizationId', 'email', 'role']),
    findByEmail({ email, fields: ['email'] }),
  ]);

  if (!org) throw createError(404, `No organization was found for '${organizationId}'`);
  if (!user) throw createError(404, `No user was found for '${email}'`);
  if (!invite) throw createError(404, `No ${org.name} invitation was found for ${email}.`);
  if (membership) throw createError(400, `This user is already a member of ${org.name}.`);

  const member = new OrgMembership({
    organizationId,
    email: invite.email,
    role: invite.role,
  });
  await member.save();
  await OrgInvitation.remove({ email: invite.email, organizationId });
  return 'ok';
};
