const {
  applicationService,
  membershipService,
  organizationService,
  userService,
} = require('@identity-x/service-clients');

const membershipResolvers = {
  id: membership => membership._id,
  organization: membership => organizationService.request('findById', { id: membership.organizationId }),
  user: membership => userService.request('findByEmail', { email: membership.email }),
};

module.exports = {
  Organization: {
    id: org => org._id,
    applications: ({ _id }) => applicationService.request('listForOrg', { id: _id }),
  },
  OrganizationInvitation: {
    invitedBy: ({ invitedByEmail }) => userService.request('findByEmail', { email: invitedByEmail }),
    ...membershipResolvers,
  },
  OrganizationMembership: membershipResolvers,

  Query: {
    organization: (_, { input }) => {
      const { id } = input;
      return organizationService.request('findById', { id });
    },

    activeOrganization: (_, args, { org }) => {
      const id = org.getId();
      return organizationService.request('findById', { id });
    },

    organizationUsers: (_, args, { org }) => {
      const id = org.getId();
      return membershipService.request('listForOrg', { id });
    },

    organizationInvitations: (_, args, { org }) => {
      const id = org.getId();
      return membershipService.request('listInvitesForOrg', { id });
    },

    organizationApplications: (_, { input }, { org }) => {
      const { sort } = input;
      const id = org.getId();
      return applicationService.request('listForOrg', { id, sort });
    },
  },

  Mutation: {
    createOrganization: async (_, { input }, { user }) => {
      const { name, description } = input;
      const payload = { name, description };
      const org = await organizationService.request('create', { payload });
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
      return organizationService.request('updateField', { id, path: 'description', value });
    },

    setOrganizationName: (_, { input }, { org }) => {
      const id = org.getId();
      const { value } = input;
      return organizationService.request('updateField', { id, path: 'name', value });
    },

    setOrganizationPhotoURL: (_, { input }) => {
      const { id, value } = input;
      return organizationService.request('updateField', { id, path: 'photoURL', value });
    },
  },
};
