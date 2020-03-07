const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const { handleError } = require('@identity-x/utils').mongoose;
const { isObject } = require('@base-cms/utils');

const { Application, CommentStream } = require('../../mongodb/models');

module.exports = async ({ applicationId, payload } = {}) => {
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!isObject(payload)) throw createRequiredParamError('payload');

  const application = await Application.findById(applicationId, ['id']);
  if (!application) throw createError(404, `No application was found for '${applicationId}'`);

  try {
    const stream = new CommentStream({
      ...payload,
      applicationId,
    });
    await stream.validate();
    const criteria = { applicationId, identifier: stream.identifier };
    await CommentStream.updateOne(criteria, {
      $setOnInsert: criteria,
      $set: {
        title: stream.title,
        description: stream.description,
      },
    }, { upsert: true });
    return CommentStream.findOne(criteria);
  } catch (e) {
    throw handleError(createError, e);
  }
};
