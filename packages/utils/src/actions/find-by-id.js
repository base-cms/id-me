const { createRequiredParamError } = require('@base-cms/micro').service;

module.exports = async (Model, { id, fields }) => {
  if (!id) throw createRequiredParamError('id');
  const doc = await Model.findById(id, fields);
  return doc || null;
};
