const { applicationService } = require('@identity-x/service-clients');

module.exports = {
  /**
   *
   */
  Query: {
    /**
     *
     */
    commentsForStream: (_, { input }, { app }) => {
      const { identifier } = input;
      const applicationId = app.getId();
      // @todo need to display unapproved and banned comments _only_ for the logged in user.
      return applicationService.request('listForStream', { applicationId, identifier });
    },
  },
};
