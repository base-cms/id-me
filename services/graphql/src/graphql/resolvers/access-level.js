const { applicationService } = require('@base-cms/id-me-service-clients');
const connectionProjection = require('../utils/connection-projection');
const typeProjection = require('../utils/type-projection');

module.exports = {
  AccessLevel: {
    id: level => level._id,
  },

  Query: {
    /**
     *
     */
    accessLevel: (_, { input }, ctx, info) => {
      const { id } = input;
      const fields = typeProjection(info);
      return applicationService.request('access-level.findById', { id, fields });
    },

    /**
     *
     */
    accessLevels: (_, { input }, { app }, info) => {
      const id = app.getId();
      const { sort, pagination } = input;
      const fields = connectionProjection(info);
      return applicationService.request('access-level.listForApp', {
        id,
        sort,
        pagination,
        fields,
      });
    },

    /**
     *
     */
    matchAccessLevels: (_, { input }, { app }) => {
      const {
        field,
        phrase,
        position,
        pagination,
        sort,
        excludeIds,
      } = input;
      const applicationId = app.getId();
      return applicationService.request('access-level.matchForApp', {
        applicationId,
        field,
        phrase,
        position,
        pagination,
        sort,
        excludeIds,
      });
    },
  },

  Mutation: {
    /**
     *
     */
    createAccessLevel: (_, { input }, { app }) => {
      const { name, description, messages } = input;
      const payload = { name, description, messages };
      const applicationId = app.getId();
      return applicationService.request('access-level.create', {
        applicationId,
        payload,
      });
    },

    /**
     *
     */
    updateAccessLevel: (_, { input }, { app }) => {
      const applicationId = app.getId();
      const { id, payload } = input;
      return applicationService.request('access-level.updateOne', {
        id,
        applicationId,
        payload,
      });
    },
  },
};
