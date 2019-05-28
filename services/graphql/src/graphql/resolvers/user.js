const userService = require('@base-cms/id-me-user-client');

module.exports = {
  Mutation: {
    inviteUserToOrg: (_, { input }) => {
      const { email, organizationId } = input;
      return userService.request('inviteToOrg', { email, organizationId });
    },
  },
};
