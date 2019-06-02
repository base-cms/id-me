const { applicationService } = require('@base-cms/id-me-service-clients');

const { isArray } = Array;

module.exports = {
  AppUser: {
    id: user => user._id,
    accessLevels: ({ accessLevelIds }) => {
      if (!isArray(accessLevelIds) || !accessLevelIds.length) return [];
      const query = { _id: { $in: accessLevelIds } };
      return applicationService.request('access-level.find', { query });
    },
    teams: ({ teamIds }) => {
      if (!isArray(teamIds) || !teamIds.length) return [];
      const query = { _id: { $in: teamIds } };
      return applicationService.request('team.find', { query });
    },
  },

  Query: {
    /**
     *
     */
    appUser: (_, { input }, { app }) => {
      const applicationId = app.getId();
      const { email } = input;
      return applicationService.request('user.findByEmail', {
        applicationId,
        email,
      });
    },
  },

  Mutation: {
    /**
     *
     */
    createAppUser: (_, { input }, { app }) => {
      const applicationId = app.getId();
      return applicationService.request('user.create', {
        applicationId,
        payload: input,
      });
    },
  },
};
