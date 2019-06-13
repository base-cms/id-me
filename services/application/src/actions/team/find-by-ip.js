const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const { handleError } = require('@base-cms/id-me-utils').mongoose;
const { toInt } = require('@base-cms/id-me-utils').ip6;

const { Application, Team } = require('../../mongodb/models');

module.exports = async ({ applicationId, ipAddress } = {}) => {
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!ipAddress) throw createRequiredParamError('ipAddress');

  const application = await Application.findById(applicationId, ['id']);
  if (!application) throw createError(404, `No application was found for '${applicationId}'`);

  try {
    const intVal = toInt(ipAddress);
    const query = {
      applicationId,
      'cidrs.min': { $gte: intVal },
      'cidrs.max': { $lte: intVal },
    };
    return Team.findOne(query);
  } catch (e) {
    throw handleError(createError, e);
  }
};
