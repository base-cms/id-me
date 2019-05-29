const userService = require('@base-cms/id-me-user-client');

module.exports = {
  User: {
    id: user => user._id,
  },

  Mutation: {
    sendUserLoginLink: (_, { input }) => {
      const { email } = input;
      return userService.request('sendLoginLink', { email });
    },

    userLogin: (_, { input }, { req }) => {
      const { token } = input;
      const ua = req.get('user-agent');
      return userService.request('login', { token, ip: req.ip, ua });
    },

    inviteUserToOrg: (_, { input }, { org }) => {
      org.check();
      // @todo Must determine if user is logged in.
      // @todo Must determine if user has org perms to complete this action.
      const { email } = input;
      return userService.request('inviteToOrg', { email, organizationId: org.getId() });
    },
  },
};
