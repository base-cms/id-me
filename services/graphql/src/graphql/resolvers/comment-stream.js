const { applicationService } = require('@identity-x/service-clients');

const { isArray } = Array;

module.exports = {
  /**
   *
   */
  CommentStream: {
    id: stream => stream._id,
    /**
     *
     */
    application: stream => applicationService.request('findById', { id: stream.applicationId }),

    /**
     *
     */
    urls: stream => (isArray(stream.urls) ? stream.urls : []),
  },
};
