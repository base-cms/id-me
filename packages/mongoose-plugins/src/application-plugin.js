const { Schema } = require('mongoose');

const applicationSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});


module.exports = function applicationPlugin(schema, { options = {} } = {}) {
  schema.add({
    application: {
      ...options,
      type: applicationSchema,
      required: true,
    },
  });

  schema.index({ 'application._id': 1 });

  schema.static('findForApplication', async function findForApplication(applicationId, fields) {
    if (!applicationId) throw new Error('Unable to find: no application ID was provided.');
    return this.find({ 'application._id': applicationId }, fields);
  });
};
