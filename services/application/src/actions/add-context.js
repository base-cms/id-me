const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const { isObject } = require('@base-cms/utils');
const Application = require('../mongodb/models/application');

module.exports = async ({ applicationId, context }) => {
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!isObject(context)) throw createRequiredParamError('context');
  const app = await Application.findById(applicationId);

  if (!app) throw createError(404, `No application was found for '${applicationId}'`);
  app.contexts.push(context);
  return app.save();
};
