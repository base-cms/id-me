const { createRequiredParamError } = require('@base-cms/micro').service;

const { Comment, CommentStream } = require('../../mongodb/models');

module.exports = async ({
  applicationId,
  identifier,
  deleted = false,
  approved = true,
  banned = false,
  activeUserId,
  fields,
  sort,
  pagination,
} = {}) => {
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!identifier) throw createRequiredParamError('identifier');

  const stream = await CommentStream.findOne({ applicationId, identifier }, ['id']);
  if (!stream) return Comment.paginateEmpty();

  const criteria = {
    streamId: stream._id,
    deleted,
    approved,
    banned,
  };

  let query = {};
  if (activeUserId) {
    query.$or = [
      criteria,
      {
        streamId: stream._id,
        deleted,
        appUserId: activeUserId,
      },
    ];
  } else {
    query = criteria;
  }

  return Comment.paginate({
    query,
    sort: sort || { field: '_id', order: 'desc' },
    projection: fields,
    additionalData: { streamId: stream._id },
    ...pagination,
  });
};
