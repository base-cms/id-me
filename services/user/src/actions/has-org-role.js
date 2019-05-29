const orgService = require('@base-cms/id-me-organization-client');
const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const OrgMembership = require('../mongodb/models/org-membership');

const { isArray } = Array;

module.exports = async ({ email, organizationId, roles }) => {
  if (!email) throw createRequiredParamError('email');
  if (!organizationId) throw createRequiredParamError('organizationId');
  if (!roles) throw createRequiredParamError('roles');

  const r = isArray(roles) ? roles : [roles];
  const [org, membership] = await Promise.all([
    orgService.request('findById', { id: organizationId, fields: ['id', 'name'] }),
    OrgMembership.findFor(organizationId, email, ['role']),
  ]);

  if (!org) throw createError(404, `No organization was found for '${organizationId}'`);
  if (!membership) return false;
  return r.includes(membership.role);
};
