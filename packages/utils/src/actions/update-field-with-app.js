const { createRequiredParamError } = require('@base-cms/micro').service;

module.exports = async (Model, {
  applicationId,
  id,
  path,
  value,
} = {}) => {
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!id) throw createRequiredParamError('id');
  if (!path) throw createRequiredParamError('path');
  const v = value === undefined || value === null ? undefined : value;

  const doc = await Model.findByIdForApp(id, applicationId);
  if (!doc) {
    const err = new Error(`No document found for ID ${id} using app ${applicationId}.`);
    err.statusCode = 404;
    throw err;
  }
  doc.set(path, v);
  return doc.save();
};
