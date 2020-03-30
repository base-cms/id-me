const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const Application = require('../mongodb/models/application');

module.exports = async ({ applicationId, contextId }) => {
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!contextId) throw createRequiredParamError('contextId');
  const app = await Application.findById(applicationId);

  if (!app) throw createError(404, `No application was found for '${applicationId}'`);
  const context = app.contexts.id(contextId);
  if (!context) throw createError(404, `No application context was found for '${contextId}'`);
  app.contexts.id(contextId).remove();
  return app.save();
};
