const { applicationService, organizationService } = require('@identity-x/service-clients');

module.exports = {
  Application: {
    id: app => app._id,
    organization: app => organizationService.request('findById', { id: app.organizationId }),
    contexts: app => app.contexts,
  },

  ApplicationContext: {
    id: context => context._id,
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
    addApplicationContext: (_, { input }) => {
      const { applicationId, payload } = input;
      return applicationService.request('addContext', {
        applicationId,
        context: payload,
      });
    },

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
    removeApplicationContext: (_, { input }) => {
      const { applicationId, contextId } = input;
      return applicationService.request('removeContext', {
        applicationId,
        contextId,
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
    updateApplicationContext: (_, { input }) => {
      const { applicationId, contextId, payload } = input;
      return applicationService.request('updateContext', {
        applicationId,
        contextId,
        context: payload,
      });
    },
  },
};
