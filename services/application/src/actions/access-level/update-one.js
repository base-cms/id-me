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

  const lavel = await AccessLevel.findByIdForApp(id, applicationId);
  if (!lavel) throw createError(404, `No access level was found for '${id}'`);
  lavel.set(payload);

  try {
    await lavel.save();
    return lavel;
  } catch (e) {
    throw handleError(createError, e);
  }
};
