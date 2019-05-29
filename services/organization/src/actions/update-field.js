const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const Organization = require('../mongodb/models/organization');

module.exports = async ({
  id,
  path,
  value,
  fields,
} = {}) => {
  if (!id) throw createRequiredParamError('id');
  if (!path) throw createRequiredParamError('path');
  const v = value === undefined || value === null ? undefined : value;

  const org = await Organization.findById(id, fields);
  if (!org) throw createError(404, `No organization found for ID ${id}.`);
  org.set(path, v);

  return org.save();
};
