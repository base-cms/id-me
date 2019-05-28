const userService = require('@base-cms/id-me-user-client');

module.exports = {
  Mutation: {
    inviteUserToOrg: (_, { input }, { org }) => {
      org.check();
      // @todo Must determine if user is logged in.
      // @todo Must determine if user has org perms to complete this action.
      const { email } = input;
      return userService.request('inviteToOrg', { email, organizationId: org.getId() });
    },
  },
};
