const { applicationService } = require('@identity-x/service-clients');
const { AuthenticationError } = require('apollo-server-express');
const typeProjection = require('../utils/type-projection');

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
    comment: (_, { input }, ctx, info) => {
      const { id } = input;
      const fields = typeProjection(info);
      return applicationService.request('comment.findById', { id, fields });
    },

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
        query: { deleted: { $ne: true } },
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

    /**
     *
     */
    setCommentApproved: (_, { input }, { app }) => {
      const applicationId = app.getId();
      const { id, value } = input;
      return applicationService.request('comment.updateFieldWithApp', {
        applicationId,
        id,
        path: 'approved',
        value,
      });
    },

    /**
     *
     */
    setCommentBody: (_, { input }, { app }) => {
      const applicationId = app.getId();
      const { id, value } = input;
      return applicationService.request('comment.updateFieldWithApp', {
        applicationId,
        id,
        path: 'body',
        value,
      });
    },

    /**
     *
     */
    setCommentFlagged: (_, { input }, { app, user }) => {
      if (user.type === 'AppUser' && user.get('banned')) {
        throw new AuthenticationError('You do not have permission to flag comments.');
      }
      const applicationId = app.getId();
      const { id, value } = input;
      return applicationService.request('comment.updateFieldWithApp', {
        applicationId,
        id,
        path: 'flagged',
        value,
      });
    },

    /**
     *
     */
    deleteComment: async (_, { input }, { app }) => {
      const applicationId = app.getId();
      const { id } = input;
      await applicationService.request('comment.updateFieldWithApp', {
        applicationId,
        id,
        path: 'deleted',
        value: true,
      });
      return 'ok';
    },
  },
};
