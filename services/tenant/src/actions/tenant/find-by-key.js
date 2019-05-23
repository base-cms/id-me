const { service } = require('@base-cms/micro');
const Tenant = require('../../mongodb/models/tenant');

const { createRequiredParamError } = service;

module.exports = async ({ key, fields }) => {
  if (!key) throw createRequiredParamError('key');
  const tenant = await Tenant.findOne({ key, deleted: { $ne: true } }, fields);
  return tenant || null;
};
