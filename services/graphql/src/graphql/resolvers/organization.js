const {
  applicationService,
  membershipService,
  orgService,
  userService,
} = require('@base-cms/id-me-service-clients');

const membershipResolvers = {
  id: membership => membership._id,
  organization: membership => orgService.request('findById', { id: membership.organizationId }),
  user: membership => userService.request('findByEmail', { email: membership.email }),
};

module.exports = {
  Organization: {
    id: org => org._id,
  },
  OrganizationInvitation: membershipResolvers,
  OrganizationMembership: membershipResolvers,

  Query: {
    organization: (_, { input }) => {
      const { id } = input;
      return orgService.request('findById', { id });
    },

    activeOrganization: (_, args, { org }) => {
      const id = org.getId();
      return orgService.request('findById', { id });
    },

    organizationUsers: (_, args, { org }) => {
      const id = org.getId();
      return membershipService.request('listForOrg', { id });
    },

    organizationInvitations: (_, args, { org }) => {
      const id = org.getId();
      return membershipService.request('listInvitesForOrg', { id });
    },

    organizationApplications: (_, args, { org }) => {
      const id = org.getId();
      return applicationService.request('listForOrg', { id });
    },
  },

  Mutation: {
    createOrganization: async (_, { input }, { user }) => {
      const { name } = input;
      const payload = { name };
      const org = await orgService.request('create', { payload });
      await membershipService.request('create', {
        organizationId: org._id,
        email: user.get('email'),
        role: 'Owner',
      });
      return org;
    },

    setOrganizationDescription: (_, { input }, { org }) => {
      const id = org.getId();
      const { value } = input;
      return orgService.request('updateField', { id, path: 'description', value });
    },

    setOrganizationName: (_, { input }, { org }) => {
      const id = org.getId();
      const { value } = input;
      return orgService.request('updateField', { id, path: 'name', value });
    },

    setOrganizationPhotoURL: (_, { input }) => {
      const { id, value } = input;
      return orgService.request('updateField', { id, path: 'photoURL', value });
    },
  },
};
