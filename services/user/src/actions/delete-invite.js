const { createRequiredParamError } = require('@base-cms/micro').service;
const { OrgInvitation } = require('../mongodb/models');

module.exports = async ({
  organizationId,
  email,
} = {}) => {
  if (!organizationId) throw createRequiredParamError('organizationId');
  if (!email) throw createRequiredParamError('email');

  await OrgInvitation.deleteFor(organizationId, email);
  return 'ok';
};
