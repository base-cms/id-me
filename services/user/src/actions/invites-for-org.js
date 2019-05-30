const { createRequiredParamError } = require('@base-cms/micro').service;
const OrgInvitation = require('../mongodb/models/org-invitation');

module.exports = async ({ id, fields }) => {
  if (!id) throw createRequiredParamError('id');
  return OrgInvitation.findForOrganization(id, fields);
};
