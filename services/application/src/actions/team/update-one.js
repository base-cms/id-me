const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const { handleError } = require('@base-cms/id-me-utils').mongoose;
const { isObject } = require('@base-cms/utils');

const { Application, Team } = require('../../mongodb/models');

module.exports = async ({ id, applicationId, payload } = {}) => {
  if (!id) throw createRequiredParamError('id');
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!isObject(payload)) throw createRequiredParamError('payload');

  const application = await Application.findById(applicationId, ['id']);
  if (!application) throw createError(404, `No application was found for '${applicationId}'`);

  const team = await Team.findByIdForApp(id, applicationId);
  if (!team) throw createError(404, `No team was found for '${id}'`);
  team.set(payload);

  try {
    await team.save();
    return team;
  } catch (e) {
    throw handleError(createError, e);
  }
};
