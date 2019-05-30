const { createRequiredParamError } = require('@base-cms/micro').service;
const OrgMembership = require('../mongodb/models/org-membership');

module.exports = async ({ email, fields }) => {
  if (!email) throw createRequiredParamError('email');
  return OrgMembership.findForUser(email, fields);
};
