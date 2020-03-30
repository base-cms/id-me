const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const { isObject } = require('@base-cms/utils');
const Application = require('../mongodb/models/application');

module.exports = async ({ applicationId, contextId, payload }) => {
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!contextId) throw createRequiredParamError('contextId');
  if (!isObject(payload)) throw createRequiredParamError('payload');
  const app = await Application.findById(applicationId);

  if (!app) throw createError(404, `No application was found for '${applicationId}'`);
  const context = app.contexts.id(contextId);
  if (!context) throw createError(404, `No application context was found for '${contextId}'`);
  Object.keys(payload).forEach(key => context.set(key, payload[key]));
  return app.save();
};
