const { applicationService } = require('@base-cms/id-me-service-clients');

module.exports = {
  Application: {
    id: app => app._id,
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

    /**
     *
     */
    setApplicationName: (_, { input }, { app }) => {
      const id = app.getId();
      const { value } = input;
      return applicationService.request('updateField', { id, path: 'name', value });
    },
  },
};
