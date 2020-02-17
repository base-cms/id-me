const { applicationService } = require('@identity-x/service-clients');
const connectionProjection = require('../utils/connection-projection');
const typeProjection = require('../utils/type-projection');

const { isArray } = Array;

module.exports = {
  Team: {
    id: team => team._id,
    accessLevels: ({ accessLevelIds }, args, ctx, info) => {
      if (!isArray(accessLevelIds) || !accessLevelIds.length) return [];

      const fields = typeProjection(info);
      const query = { _id: { $in: accessLevelIds } };
      return applicationService.request('access-level.find', { query, fields });
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
    teams: (_, { input }, { app }, info) => {
      const id = app.getId();
      const { sort, pagination } = input;
      const fields = connectionProjection(info);
      return applicationService.request('team.listForApp', {
        id,
        sort,
        pagination,
        fields,
      });
    },

    matchTeams: (_, { input }, { app }, info) => {
      const applicationId = app.getId();

      const fields = connectionProjection(info);
      const {
        field,
        phrase,
        position,
        pagination,
        sort,
        excludeIds,
      } = input;

      return applicationService.request('team.matchForApp', {
        applicationId,
        field,
        phrase,
        position,
        fields,
        pagination,
        sort,
        excludeIds,
      });
    },

    team: (_, { input }, ctx, info) => {
      const { id } = input;
      const fields = typeProjection(info);
      return applicationService.request('team.findById', { id, fields });
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

    /**
     *
     */
    updateTeam: (_, { input }, { app }) => {
      const applicationId = app.getId();
      const { id, payload } = input;
      const { cidrs } = payload;
      return applicationService.request('team.updateOne', {
        id,
        applicationId,
        payload: {
          ...payload,
          cidrs: isArray(cidrs) ? cidrs.map(value => ({ value })) : [],
        },
      });
    },
  },
};
