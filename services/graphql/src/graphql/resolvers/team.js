const { applicationService } = require('@base-cms/id-me-service-clients');

const { isArray } = Array;

module.exports = {
  Team: {
    id: team => team._id,
    accessLevels: ({ accessLevelIds }) => {
      if (!isArray(accessLevelIds) || !accessLevelIds.length) return [];
      const query = { _id: { $in: accessLevelIds } };
      return applicationService.request('access-level.find', { query });
    },
  },

  Mutation: {
    /**
     *
     */
    createTeam: (_, { input }, { app }) => {
      const applicationId = app.getId();
      return applicationService.request('team.create', {
        applicationId,
        payload: input,
      });
    },
  },
};
