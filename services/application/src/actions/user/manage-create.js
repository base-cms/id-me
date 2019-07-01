const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const { handleError } = require('@base-cms/id-me-utils').mongoose;
const { isObject } = require('@base-cms/utils');

const { Application, AppUser } = require('../../mongodb/models');

module.exports = async ({ applicationId, payload } = {}) => {
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!isObject(payload)) throw createRequiredParamError('payload');

  const application = await Application.findById(applicationId, ['id']);
  if (!application) throw createError(404, `No application was found for '${applicationId}'`);

  console.log(payload);

  try {
    const user = await AppUser.create({
      ...payload,
      applicationId,
    });
    return user;
  } catch (e) {
    throw handleError(createError, e);
  }
};
