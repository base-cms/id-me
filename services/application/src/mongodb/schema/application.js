const { Schema } = require('mongoose');

const organizationSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  organization: {
    type: organizationSchema,
  },
}, { timestamps: true });

schema.index({ 'organization._id': 1 });

schema.static('findForOrganization', async function findForOrganization(organizationId, fields) {
  if (!organizationId) throw new Error('Unable to find: no organization ID was provided.');
  return this.find({ organizationId }, fields);
});

module.exports = schema;
