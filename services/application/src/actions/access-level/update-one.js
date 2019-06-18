const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const { handleError } = require('@base-cms/id-me-utils').mongoose;
const { isObject } = require('@base-cms/utils');

const { Application, AccessLevel } = require('../../mongodb/models');

module.exports = async ({ id, applicationId, payload } = {}) => {
  if (!id) throw createRequiredParamError('id');
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!isObject(payload)) throw createRequiredParamError('payload');

  const application = await Application.findById(applicationId, ['id']);
  if (!application) throw createError(404, `No application was found for '${applicationId}'`);

  const level = await AccessLevel.findByIdForApp(id, applicationId);
  if (!level) throw createError(404, `No access level was found for '${id}'`);
  level.set(payload);

  try {
    await level.save();
    return level;
  } catch (e) {
    throw handleError(createError, e);
  }
};
