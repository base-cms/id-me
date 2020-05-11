const {
  applicationService,
  membershipService,
  organizationService,
  userService,
  localeService,
} = require('@identity-x/service-clients');
const { getAsObject } = require('@base-cms/object-path');

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
  OrganizationCompany: {
    id: company => company._id,
  },
  OrganizationInvitation: {
    invitedBy: ({ invitedByEmail }) => userService.request('findByEmail', { email: invitedByEmail }),
    ...membershipResolvers,
  },
  OrganizationMembership: membershipResolvers,

  OrganizationRegionalConsentPolicy: {
    id: policy => policy._id,
    countries: ({ countryCodes }) => localeService.request('country.asObjects', { codes: countryCodes }),
  },

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

      const company = getAsObject(input, 'company');

      const payload = {
        name,
        description,
        company: {
          ...company,
          ...(!company.name && { name }),
        },
      };

      const org = await organizationService.request('create', { payload });
      await membershipService.request('create', {
        organizationId: org._id,
        email: user.get('email'),
        role: 'Owner',
      });
      return org;
    },

    /**
     *
     */
    updateOrganization: (_, { input }) => {
      const { id, payload } = input;
      return organizationService.request('updateForId', {
        id,
        update: { $set: payload },
      });
    },

    /**
     *
     */
    setOrganizationCompanyInfo: (_, { input }, { org }) => {
      const id = org.getId();
      const { company } = input;
      return organizationService.request('updateCompanyInfo', {
        id,
        payload: company,
      });
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

    /**
     *
     */
    addOrganizationRegionalConsentPolicy(_, { input }, { org }) {
      const id = org.getId();
      const { payload } = input;
      return organizationService.request('regionalConsentPolicy.add', { id, payload });
    },

    /**
     *
     */
    removeOrganizationRegionalConsentPolicy(_, { input }, { org }) {
      const id = org.getId();
      const { policyId } = input;
      return organizationService.request('regionalConsentPolicy.remove', { id, policyId });
    },

    /**
     *
     */
    updateOrganizationRegionalConsentPolicy(_, { input }, { org }) {
      const id = org.getId();
      const { policyId, payload } = input;
      return organizationService.request('regionalConsentPolicy.remove', { id, policyId, payload });
    },
  },
};
