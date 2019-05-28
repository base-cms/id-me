const organizationService = require('@base-cms/id-me-organization-client');

module.exports = {
  Mutation: {
    inviteUserToOrg: async (_, { input }) => {
      const res = await organizationService.request('user.inviteToOrg', input);
      return res;
    },
  },
};
