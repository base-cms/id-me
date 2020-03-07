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
    commentsForStream: (_, { input }, { app }) => {
      const { identifier } = input;
      const applicationId = app.getId();
      // @todo need to display unapproved and banned comments _only_ for the logged in user.
      return applicationService.request('comment.listForStream', { applicationId, identifier });
    },
  },
};
