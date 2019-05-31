const { createRequiredParamError } = require('@base-cms/micro').service;

module.exports = async (Model, {
  id,
  path,
  value,
  fields,
} = {}) => {
  if (!id) throw createRequiredParamError('id');
  if (!path) throw createRequiredParamError('path');
  const v = value === undefined || value === null ? undefined : value;

  const doc = await Model.findById(id, fields);
  if (!doc) {
    const err = new Error(`No document found for ID ${id}.`);
    err.statusCode = 404;
    throw err;
  }
  doc.set(path, v);
  return doc.save();
};
