const { createRequiredParamError } = require('@base-cms/micro').service;

const Application = require('../mongodb/models/application');

module.exports = async ({ id, fields }) => {
  if (!id) throw createRequiredParamError('id');
  const org = await Application.findById(id, fields);
  return org || null;
};
