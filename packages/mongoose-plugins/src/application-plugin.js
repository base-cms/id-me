const { Schema } = require('mongoose');

module.exports = function applicationPlugin(schema, { options = {} } = {}) {
  schema.add({
    applicationId: {
      ...options,
      type: Schema.Types.ObjectId,
      index: true,
      required: true,
    },
  });

  schema.static('findForApplication', async function findForApplication(applicationId, fields) {
    if (!applicationId) throw new Error('Unable to find: no application ID was provided.');
    return this.find({ applicationId }, fields);
  });
};
