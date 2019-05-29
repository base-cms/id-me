const orgService = require('@base-cms/id-me-organization-client');
const userService = require('@base-cms/id-me-user-client');

module.exports = {
  User: {
    id: user => user._id,
  },

  UserMembership: {
    id: membership => membership._id,
    organization: membership => orgService.request('findById', { id: membership.organizationId }),
    user: membership => userService.request('findByEmail', { email: membership.email }),
  },

  Query: {
    userOrganizations: async (_, args, { user }) => {
      const email = user.get('email');
      return userService.request('orgMemberships', { email });
    },
  },

  Mutation: {
    /**
     * @todo This should require reCaptcha to prevent spam.
     */
    registerNewUser: async (_, { input }) => {
      const {
        email,
        givenName,
        familyName,
        orgName,
      } = input;
      const userPayload = { givenName, familyName };
      const user = await userService.request('create', { email, payload: userPayload });
      const organization = await orgService.request('create', { payload: { name: orgName } });
      await userService.request('setOrgMembership', {
        organizationId: organization._id,
        email: user.email,
        role: 'Owner',
      });
      await userService.request('sendLoginLink', { email: user.email });
      return { user, organization };
    },

    /**
     *
     */
    sendUserLoginLink: (_, { input }) => {
      const { email } = input;
      return userService.request('sendLoginLink', { email });
    },

    /**
     *
     */
    userLogin: (_, { input }, { req }) => {
      const { token } = input;
      const ua = req.get('user-agent');
      return userService.request('login', { token, ip: req.ip, ua });
    },

    /**
     *
     */
    inviteUserToOrg: (_, { input }, { org }) => {
      const { email } = input;
      return userService.request('inviteToOrg', { email, organizationId: org.getId() });
    },
  },
};
