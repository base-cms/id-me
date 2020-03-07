const { createRequiredParamError } = require('@base-cms/micro').service;

const { Comment } = require('../../mongodb/models');

module.exports = async ({
  streamId,
  fields,
  sort,
  pagination,
} = {}) => {
  if (!streamId) throw createRequiredParamError('streamId');
  return Comment.paginate({
    query: { streamId },
    sort: sort || { field: '_id', order: 'desc' },
    projection: fields,
    ...pagination,
  });
};
