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
    cidrs: ({ cidrs }) => {
      if (!isArray(cidrs) || !cidrs.length) return [];
      return cidrs.map(c => c.value).filter(c => c);
    },
    /**
     * @deprecated
     */
    ipAddresses: ({ cidrs }) => {
      if (!isArray(cidrs) || !cidrs.length) return [];
      return cidrs.map(c => c.value).filter(c => c);
    },
  },

  Query: {
    /**
     *
     */
    teams: (_, args, { app }) => {
      const id = app.getId();
      return applicationService.request('team.listForApp', { id });
    },
  },

  Mutation: {
    /**
     *
     */
    createTeam: (_, { input }, { app }) => {
      const applicationId = app.getId();
      const { cidrs } = input;
      return applicationService.request('team.create', {
        applicationId,
        payload: {
          ...input,
          cidrs: isArray(cidrs) ? cidrs.map(value => ({ value })) : [],
        },
      });
    },
  },
};
