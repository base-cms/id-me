const { createRequiredParamError } = require('@base-cms/micro').service;
const OrgInvitation = require('../mongodb/models/org-invitation');

module.exports = async ({ email, fields }) => {
  if (!email) throw createRequiredParamError('email');
  return OrgInvitation.findForUser(email, fields);
};
