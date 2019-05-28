const { referencePlugin } = require('@base-cms/id-me-mongoose-plugins');
const connection = require('../../connection');

module.exports = function organizationPlugin(schema) {
  schema.plugin(referencePlugin, {
    name: 'organizationId',
  });

  schema.index({ organizationId: 1, email: 1 }, { unique: true });

  schema.static('findFor', async function findFor(organizationId, emailAddress, fields) {
    const email = connection.model('user').normalizeEmail(emailAddress);
    if (!email) throw new Error('Unable to find: no email address was provided.');
    if (!organizationId) throw new Error('Unable to find: no organization ID was provided.');
    return this.findOne({ organizationId, email }, fields);
  });
};
