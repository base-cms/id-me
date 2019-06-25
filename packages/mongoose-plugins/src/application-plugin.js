const { Schema } = require('mongoose');
const paginablePlugin = require('./paginable');

module.exports = function applicationPlugin(schema, { options = {}, collateWhen = [] } = {}) {
  schema.add({
    applicationId: {
      ...options,
      type: Schema.Types.ObjectId,
      index: true,
      required: true,
    },
  });

  schema.plugin(paginablePlugin, { collateWhen });

  schema.static('findForApplication', async function findForApplication(applicationId, fields, { pagination, query, sort }) {
    if (!applicationId) throw new Error('Unable to find: no application ID was provided.');
    return this.paginate({
      query: { ...query, applicationId },
      sort,
      projection: fields,
      ...pagination,
    });
  });

  schema.static('findByIdForApp', async function findByIdForApp(id, applicationId, fields) {
    if (!applicationId) throw new Error('Unable to find: no application ID was provided.');
    if (!id) throw new Error('Unable to find: no ID was provided.');
    return this.findOne({ _id: id, applicationId }, fields);
  });
};
