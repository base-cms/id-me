const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const { handleError } = require('@base-cms/id-me-utils').mongoose;
const { isObject } = require('@base-cms/utils');

const { Application, Team } = require('../../mongodb/models');

const { error } = console;

module.exports = async ({ applicationId, payload } = {}) => {
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!isObject(payload)) throw createRequiredParamError('payload');

  const application = await Application.findById(applicationId, ['id']);
  if (!application) throw createError(404, `No application was found for '${applicationId}'`);

  try {
    const level = await Team.create({
      ...payload,
      applicationId,
    });
    return level;
  } catch (e) {
    error(e);
    throw handleError(createError, e);
  }
};
