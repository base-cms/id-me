const { applicationService } = require('@base-cms/id-me-service-clients');

module.exports = {
  Application: {
    id: createApplication => createApplication._id,
  },

  Mutation: {
    /**
     *
     */
    createApplication: (_, { input }, { org }) => {
      const { name, description } = input;
      const payload = { name, description };
      const organizationId = org.getId();
      return applicationService.request('create', {
        organizationId,
        payload,
      });
    },
  },
};
