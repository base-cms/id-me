const orgService = require('@base-cms/id-me-organization-client');
const userService = require('@base-cms/id-me-user-client');

module.exports = {
  Organization: {
    id: org => org._id,
  },

  Mutation: {
    createOrganization: async (_, { input }, { user }) => {
      const { name } = input;
      const payload = { name };
      const org = await orgService.request('create', { payload });
      await userService.request('setOrgMembership', {
        organizationId: org._id,
        email: user.get('email'),
        role: 'Owner',
      });
      return org;
    },

    setOrganizationName: (_, { input }) => {
      const { id, value } = input;
      return orgService.request('updateField', { id, path: 'name', value });
    },
  },
};
