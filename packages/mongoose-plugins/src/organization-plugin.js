const { Schema } = require('mongoose');

const organizationSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = function organizationPlugin(schema, { options = {} } = {}) {
  schema.add({
    organization: {
      ...options,
      type: organizationSchema,
      required: true,
    },
  });

  schema.index({ 'organization._id': 1 });

  schema.static('findForOrganization', async function findForOrganization(organizationId, fields) {
    if (!organizationId) throw new Error('Unable to find: no organization ID was provided.');
    return this.find({ 'organization._id': organizationId }, fields);
  });
};
