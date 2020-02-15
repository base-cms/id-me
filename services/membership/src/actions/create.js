const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const { orgService, userService } = require('@identity-x/service-clients');

const { OrgMembership } = require('../mongodb/models');

const createMembership = async ({ email, organizationId, role }) => {
  const member = new OrgMembership({ email, organizationId, role });
  await member.validate();
  const obj = member.toObject();
  delete obj._id;
  return obj;
};

module.exports = async ({
  organizationId,
  email,
  role,
}) => {
  if (!organizationId) throw createRequiredParamError('organizationId');
  if (!email) throw createRequiredParamError('email');
  if (!role) throw createRequiredParamError('role');

  const [org, user] = await Promise.all([
    orgService.request('findById', { id: organizationId, fields: ['id'] }),
    userService.request('findByEmail', { email, fields: ['email'] }),
  ]);

  if (!org) throw createError(404, `No organization was found for '${organizationId}'`);
  if (!user) throw createError(404, `No user was found for '${email}'`);

  const query = { email: user.email, organizationId };
  const member = await createMembership({ ...query, role });

  await OrgMembership.updateOne(query, { $setOnInsert: member }, { upsert: true });
  return 'ok';
};
