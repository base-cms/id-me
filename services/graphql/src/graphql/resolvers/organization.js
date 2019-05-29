const orgService = require('@base-cms/id-me-organization-client');

module.exports = {
  Organization: {
    id: org => org._id,
  },

  Mutation: {
    setOrganizationName: (_, { input }) => {
      const { id, value } = input;
      return orgService.request('updateField', { id, path: 'name', value });
    },
  },
};
