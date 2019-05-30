const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const { OrgMembership } = require('../mongodb/models');

module.exports = async ({
  organizationId,
  email,
  role,
}) => {
  if (!organizationId) throw createRequiredParamError('organizationId');
  if (!email) throw createRequiredParamError('email');
  if (!role) throw createRequiredParamError('role');

  const membership = await OrgMembership.findFor(organizationId, email);
  if (!membership) throw createError(404, 'No organization membership was found for the provided org and user');

  membership.set('role', role);
  return membership.save();
};
