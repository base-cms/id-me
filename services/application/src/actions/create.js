const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const { handleError } = require('@identity-x/utils').mongoose;
const { isObject } = require('@base-cms/utils');
const { organizationService } = require('@identity-x/service-clients');

const Application = require('../mongodb/models/application');

module.exports = async ({ organizationId, payload } = {}) => {
  if (!organizationId) throw createRequiredParamError('organizationId');
  if (!isObject(payload)) throw createRequiredParamError('payload');

  const organization = await organizationService.request('findById', { id: organizationId, fields: ['id'] });
  if (!organization) throw createError(404, `No organization was found for '${organizationId}'`);

  try {
    const app = await Application.create({
      ...payload,
      organizationId,
    });
    return app;
  } catch (e) {
    throw handleError(createError, e);
  }
};
