const { service } = require('@base-cms/micro');
const Organization = require('../mongodb/models/organization');

const { createRequiredParamError } = service;

module.exports = async ({ id, fields }) => {
  if (!id) throw createRequiredParamError('id');
  const org = await Organization.findById(id, fields);
  return org || null;
};
