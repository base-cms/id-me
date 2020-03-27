const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const Organization = require('../mongodb/models/organization');

module.exports = async ({
  id,
  payload = {},
} = {}) => {
  if (!id) throw createRequiredParamError('id');
  const org = await Organization.findById(id);
  if (!org) throw createError(404, `No organization found for ID ${id}.`);
  Object.keys(payload).forEach(key => org.set(`company.${key}`, payload[key]));
  return org.save();
};
