const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const Organization = require('../mongodb/models/organization');

const getPolicy = async ({ id, policyId, fields }) => {
  const org = await Organization.findById(id, fields);
  if (!org) throw createError(404, `No organization was found for '${id}'`);

  const policy = org.regionalConsentPolicies.id(policyId);
  if (!policy) throw createError(404, `No regional consent policy was found for '${policyId}'`);
  return { org, policy };
};


module.exports = {
  add: async ({ id, payload }) => {
    if (!id) throw createRequiredParamError('id');
    if (!payload) throw createRequiredParamError('payload');
    const org = await Organization.findById(id);
    if (!org) throw createError(404, `No organization was found for '${id}'`);
    org.regionalConsentPolicies.push(payload);
    return org.save();
  },

  findOne: async ({ id, policyId }) => {
    if (!id) throw createRequiredParamError('id');
    if (!policyId) throw createRequiredParamError('policyId');
    const { policy } = await getPolicy({ id, policyId, fields: ['regionalConsentPolicies'] });
    return policy;
  },

  remove: async ({ id, policyId }) => {
    if (!id) throw createRequiredParamError('id');
    if (!policyId) throw createRequiredParamError('policyId');
    const { org, policy } = await getPolicy({ id, policyId });
    policy.remove();
    return org.save();
  },

  update: async ({ id, policyId, payload }) => {
    if (!id) throw createRequiredParamError('id');
    if (!policyId) throw createRequiredParamError('policyId');
    if (!payload) throw createRequiredParamError('payload');
    const { org, policy } = await getPolicy({ id, policyId });
    Object.keys(payload).forEach(key => policy.set(key, payload[key]));
    return org.save();
  },
};
