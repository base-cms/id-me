const { createRequiredParamError } = require('@base-cms/micro').service;
const OrgMembership = require('../mongodb/models/org-membership');

module.exports = async ({ id, fields }) => {
  if (!id) throw createRequiredParamError('id');
  return OrgMembership.findForOrganization(id, fields);
};
