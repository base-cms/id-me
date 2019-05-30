const orgService = require('@base-cms/id-me-organization-client');
const userService = require('@base-cms/id-me-user-client');

module.exports = {
  Organization: {
    id: org => org._id,
  },

  OrganizationMembership: {
    id: membership => membership._id,
    organization: membership => orgService.request('findById', { id: membership.organizationId }),
    user: membership => userService.request('findByEmail', { email: membership.email }),
  },


  Query: {
    activeOrganization: (_, args, { org }) => {
      const id = org.getId();
      return orgService.request('findById', { id });
    },

    organizationUsers: (_, args, { org }) => {
      const id = org.getId();
      return userService.request('findForOrg', { id });
    },
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

    setOrganizationDescription: (_, { input }) => {
      const { id, value } = input;
      return orgService.request('updateField', { id, path: 'description', value });
    },

    setOrganizationName: (_, { input }) => {
      const { id, value } = input;
      return orgService.request('updateField', { id, path: 'name', value });
    },
  },
};
