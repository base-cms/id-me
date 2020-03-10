const { applicationService } = require('@identity-x/service-clients');

module.exports = {
  /**
   *
   */
  Comment: {
    id: comment => comment._id,
    /**
     *
     */
    stream: comment => applicationService.request('comment-stream.findById', { id: comment.streamId }),

    /**
     *
     */
    user: comment => applicationService.request('user.findById', { id: comment.appUserId }),
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    commentsForStream: (_, { input }, { app, user }) => {
      const { identifier, sort, pagination } = input;
      const applicationId = app.getId();
      const activeUserId = user.hasValidUser('AppUser') ? user.getId() : undefined;
      return applicationService.request('comment.listForStream', {
        applicationId,
        identifier,
        activeUserId,
        sort,
        pagination,
      });
    },

    /**
     *
     */
    comments: (_, { input }, { app }) => {
      const id = app.getId();
      const { sort, pagination } = input;
      return applicationService.request('comment.listForApp', {
        id,
        sort,
        pagination,
      });
    },
  },

  /**
   *
   */
  Mutation: {
    /**
     *
     */
    createComment: (_, { input }, { app, user }) => {
      const { body, displayName, stream } = input;
      const applicationId = app.getId();
      const appUserId = user.getId();
      return applicationService.request('comment.create', {
        applicationId,
        appUserId,
        body,
        stream,
        displayName,
      });
    },
  },
};