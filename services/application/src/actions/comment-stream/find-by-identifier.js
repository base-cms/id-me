const { service } = require('@base-cms/micro');
const CommentStream = require('../../mongodb/models/comment-stream');

const { createRequiredParamError } = service;

module.exports = async ({ applicationId, identifier, fields }) => {
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!identifier) throw createRequiredParamError('identifier');
  const stream = await CommentStream.findOne({ applicationId, identifier }, fields);
  return stream || null;
};
