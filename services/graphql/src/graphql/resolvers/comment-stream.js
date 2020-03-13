const { applicationService } = require('@identity-x/service-clients');
const connectionProjection = require('../utils/connection-projection');
const typeProjection = require('../utils/type-projection');

module.exports = {
  /**
   *
   */
  CommentStream: {
    id: stream => stream._id,
    /**
     *
     */
    application: (stream, _, __, info) => {
      const fields = typeProjection(info);
      return applicationService.request('findById', { id: stream.applicationId, fields });
    },
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    commentStream: (_, { input }, ctx, info) => {
      const { id } = input;
      const fields = typeProjection(info);
      return applicationService.request('comment.findById', { id, fields });
    },

    /**
     *
     */
    matchCommentStreams: (_, { input }, { app }, info) => {
      const applicationId = app.getId();
      const fields = connectionProjection(info);
      const {
        field,
        phrase,
        position,
        pagination,
        sort,
        excludeIds,
      } = input;

      return applicationService.request('comment-stream.matchForApp', {
        applicationId,
        field,
        phrase,
        position,
        fields,
        pagination,
        sort,
        excludeIds,
      });
    },
  },
};
