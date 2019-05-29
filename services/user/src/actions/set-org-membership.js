const orgService = require('@base-cms/id-me-organization-client');
const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const findByEmail = require('./find-by-email');
const { OrgMembership } = require('../mongodb/models');

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
    findByEmail({ email, fields: ['email'] }),
  ]);

  if (!org) throw createError(404, `No organization was found for '${organizationId}'`);
  if (!user) throw createError(404, `No user was found for '${email}'`);

  const query = { email: user.email, organizationId };
  const member = new OrgMembership({ ...query, role });
  await member.validate();
  const $setOnInsert = member.toObject();
  delete $setOnInsert._id;

  await OrgMembership.update(query, { $setOnInsert }, { upsert: true });
  return 'ok';
};
