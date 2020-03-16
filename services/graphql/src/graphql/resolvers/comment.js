const { applicationService } = require('@identity-x/service-clients');
const { AuthenticationError } = require('apollo-server-express');
const connectionProjection = require('../utils/connection-projection');
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
    stream: (comment, _, __, info) => {
      const fields = typeProjection(info);
      return applicationService.request('comment-stream.findById', { id: comment.streamId, fields });
    },

    /**
     *
     */
    user: (comment, _, __, info) => {
      const fields = typeProjection(info);
      return applicationService.request('user.findById', { id: comment.appUserId, fields });
    },
  },

  /**
   *
   */
  CommentConnection: {
    /**
     *
     */
    stream: ({ streamId }, _, __, info) => {
      if (!streamId) return null;
      const fields = typeProjection(info);
      return applicationService.request('comment-stream.findById', { id: streamId, fields });
    },
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
    commentsForStream: (_, { input }, { app, user }, info) => {
      const { identifier, sort, pagination } = input;
      const applicationId = app.getId();
      const activeUserId = user.hasValidUser('AppUser') ? user.getId() : undefined;
      const fields = connectionProjection(info);
      return applicationService.request('comment.listForStream', {
        applicationId,
        identifier,
        activeUserId,
        sort,
        pagination,
        fields,
      });
    },

    /**
     *
     */
    comments: (_, { input }, { app }, info) => {
      const id = app.getId();
      const {
        statuses,
        userIds,
        streamIds,
        starting,
        ending,
        sort,
        pagination,
      } = input;
      const fields = connectionProjection(info);

      const query = { deleted: { $ne: true } };

      const $and = [];
      if (statuses.length) {
        const statusMap = {
          Approved: { approved: true },
          Rejected: { approved: false },
          Banned: { banned: true },
          Flagged: { flagged: true },
        };
        const statusOr = statuses.map(status => statusMap[status]);
        $and.push({ $or: statusOr });
      }

      if (userIds.length) $and.push({ appUserId: { $in: userIds } });
      if (streamIds.length) $and.push({ streamId: { $in: streamIds } });
      if (starting || ending) {
        $and.push({
          createdAt: {
            ...(starting && { $gte: starting }),
            ...(ending && { $lte: ending }),
          },
        });
      }

      if ($and.length) query.$and = $and;
      return applicationService.request('comment.listForApp', {
        id,
        query,
        sort,
        pagination,
        fields,
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
