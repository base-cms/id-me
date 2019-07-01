const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const { OrgInvitation } = require('../mongodb/models');

module.exports = async ({
  organizationId,
  email,
} = {}) => {
  if (!organizationId) throw createRequiredParamError('organizationId');
  if (!email) throw createRequiredParamError('email');

  const invite = await OrgInvitation.findFor(organizationId, email);
  if (!invite) throw createError(404, 'No invite was found for the provided organization and email address.');
  return invite;
};
