const { createRequiredParamError } = require('@base-cms/micro').service;
const findById = require('./find-by-id');

module.exports = async (Model, {
  id,
  update,
  fields,
  options,
} = {}) => {
  if (!id) throw createRequiredParamError('id');
  await Model.updateOne({ _id: id }, update, options);
  return findById(Model, { id, fields });
};
