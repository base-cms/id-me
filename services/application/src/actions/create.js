const orgService = require('@base-cms/id-me-organization-client');
const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const { handleError } = require('@base-cms/id-me-utils').mongoose;
const { isObject } = require('@base-cms/utils');

const Application = require('../mongodb/models/application');

module.exports = async ({ organizationId, payload } = {}) => {
  if (!organizationId) throw createRequiredParamError('organizationId');
  if (!isObject(payload)) throw createRequiredParamError('payload');

  const organization = await orgService.request('findById', { id: organizationId, fields: ['id', 'name'] });
  if (!organization) throw createError(404, `No organization was found for '${organizationId}'`);

  try {
    const app = await Application.create({
      ...payload,
      organization,
    });
    return app;
  } catch (e) {
    throw handleError(e);
  }
};
