const { applicationService } = require('@base-cms/id-me-service-clients');

module.exports = {
  AccessLevel: {
    id: level => level._id,
  },

  Query: {
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
  },
};
