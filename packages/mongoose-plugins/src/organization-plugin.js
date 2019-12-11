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

  schema.static('findForOrganization', async function findForOrganization(organizationId, fields, { sort } = {}) {
    if (!organizationId) throw new Error('Unable to find: no organization ID was provided.');
    // @todo ths should be updated to use the pagination plugin
    // (similar to how the application-plugin is working).
    // Unfortunately, this will change the shape of most GQL queries.
    const sortFormatted = {};
    if (sort) sortFormatted[sort.field] = sort.order === 'asc' ? 1 : -1;
    return this.find({ organizationId }, fields, { sort: sortFormatted });
  });
};
