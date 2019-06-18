const { applicationService } = require('@base-cms/id-me-service-clients');

module.exports = {
  AccessLevel: {
    id: level => level._id,
  },

  Query: {
    /**
     *
     */
    accessLevel: (_, { input }) => {
      const { id } = input;
      return applicationService.request('access-level.findById', { id });
    },

    /**
     *
     */
    accessLevels: (_, args, { app }) => {
      const id = app.getId();
      return applicationService.request('access-level.listForApp', { id });
    },

    /**
     *
     */
    matchAccessLevels: (_, { input }, { app }) => {
      const {
        field,
        phrase,
        position,
        excludeIds,
      } = input;
      const applicationId = app.getId();
      return applicationService.request('access-level.matchForApp', {
        applicationId,
        field,
        phrase,
        position,
        excludeIds,
      });
    },
  },

  Mutation: {
    /**
     *
     */
    createAccessLevel: (_, { input }, { app }) => {
      const { name, description } = input;
      const payload = { name, description };
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
