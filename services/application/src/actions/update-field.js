const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;

const Application = require('../mongodb/models/application');

module.exports = async ({
  id,
  path,
  value,
  fields,
} = {}) => {
  if (!id) throw createRequiredParamError('id');
  if (!path) throw createRequiredParamError('path');
  const v = value === undefined || value === null ? undefined : value;

  const app = await Application.findById(id, fields);
  if (!app) throw createError(404, `No application found for ID ${id}.`);
  app.set(path, v);

  return app.save();
};
