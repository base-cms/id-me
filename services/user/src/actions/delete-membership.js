const { createRequiredParamError } = require('@base-cms/micro').service;
const { OrgMembership } = require('../mongodb/models');

module.exports = async ({
  organizationId,
  email,
} = {}) => {
  if (!organizationId) throw createRequiredParamError('organizationId');
  if (!email) throw createRequiredParamError('email');

  await OrgMembership.deleteFor(organizationId, email);
  return 'ok';
};
