const orgService = require('@base-cms/id-me-organization-client');
const userService = require('@base-cms/id-me-user-client');
const { UserInputError } = require('apollo-server-express');

module.exports = {
  User: {
    id: user => user._id,
  },

  Query: {
    activeUser: (_, args, { user }) => {
      const email = user.get('email');
      return userService.request('findByEmail', { email });
    },

    userOrganizations: async (_, args, { user }) => {
      const email = user.get('email');
      return userService.request('orgMemberships', { email });
    },

    userInvitations: async (_, args, { user }) => {
      const email = user.get('email');
      return userService.request('orgInvitations', { email });
    },
  },

  Mutation: {
    /**
     *
     */
    inviteUserToOrg: (_, { input }, { org }) => {
      const { email, role } = input;
      const organizationId = org.getId();
      return userService.request('inviteToOrg', { email, organizationId, role });
    },

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
    setActiveUserFamilyName: (_, { input }, { user }) => {
      const { value } = input;
      const email = user.get('email');
      return userService.request('updateField', { email, path: 'familyName', value });
    },

    /**
     *
     */
    setActiveUserGivenName: (_, { input }, { user }) => {
      const { value } = input;
      const email = user.get('email');
      return userService.request('updateField', { email, path: 'givenName', value });
    },

    /**
     *
     */
    updateUserOrgRole: (_, { input }, { org, user }) => {
      const { email, role } = input;
      const organizationId = org.getId();
      if (email === user.get('email')) throw new UserInputError('As owner, you cannot change your own role.');
      return userService.request('changeOrgRole', { organizationId, email, role });
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
    userLogout: async (_, args, { user }) => {
      await userService.request('logout', { token: user.token });
      return 'ok';
    },
  },
};
