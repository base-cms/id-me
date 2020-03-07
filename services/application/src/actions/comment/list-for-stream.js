const { createRequiredParamError } = require('@base-cms/micro').service;

const { Comment, CommentStream } = require('../../mongodb/models');

module.exports = async ({
  applicationId,
  identifier,
  deleted = false,
  fields,
  sort,
  pagination,
} = {}) => {
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!identifier) throw createRequiredParamError('identifier');

  const stream = await CommentStream.findOne({ applicationId, identifier }, ['id']);
  if (!stream) return Comment.paginateEmpty();

  return Comment.paginate({
    query: { streamId: stream._id, deleted },
    sort: sort || { field: '_id', order: 'desc' },
    projection: fields,
    ...pagination,
  });
};
