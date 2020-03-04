const { applicationService, organizationService } = require('@identity-x/service-clients');

module.exports = {
  Application: {
    id: app => app._id,
    organization: app => organizationService.request('findById', { id: app.organizationId }),
  },

  Query: {

    activeApplication: (_, args, { app }) => {
      const id = app.getId();
      return applicationService.request('findById', { id });
    },

    application: (_, { input }) => {
      const { id } = input;
      return applicationService.request('findById', { id });
    },
  },

  Mutation: {
    /**
     *
     */
    createApplication: (_, { input }, { org }) => {
      const { name, description, email } = input;
      const payload = { name, description, email };
      const organizationId = org.getId();
      return applicationService.request('create', {
        organizationId,
        payload,
      });
    },

    /**
     *
     */
    updateApplication: (_, { input }) => {
      const { id, payload } = input;
      return applicationService.request('updateForId', {
        id,
        update: { $set: payload },
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
