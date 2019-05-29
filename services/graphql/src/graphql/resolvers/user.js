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
      const { email } = input;
      return userService.request('inviteToOrg', { email, organizationId: org.getId() });
    },
  },
};
