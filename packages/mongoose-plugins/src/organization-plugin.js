const { Schema } = require('mongoose');

module.exports = function organizationPlugin(schema, { options = {} } = {}) {
  schema.add({
    organizationId: {
      ...options,
      type: Schema.Types.ObjectId,
      index: true,
      required: true,
    },
  });

  schema.static('findForOrganization', async function findForOrganization(organizationId, fields) {
    if (!organizationId) throw new Error('Unable to find: no organization ID was provided.');
    return this.find({ organizationId }, fields);
  });
};
