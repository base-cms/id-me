const { referencePlugin } = require('@base-cms/id-me-mongoose-plugins');
const { normalizeEmail } = require('@base-cms/id-me-utils');

module.exports = function organizationPlugin(schema) {
  schema.plugin(referencePlugin, {
    name: 'organizationId',
  });

  schema.index({ organizationId: 1, email: 1 }, { unique: true });

  schema.static('findFor', async function findFor(organizationId, emailAddress, fields) {
    const email = normalizeEmail(emailAddress);
    if (!email) throw new Error('Unable to find: no email address was provided.');
    if (!organizationId) throw new Error('Unable to find: no organization ID was provided.');
    return this.findOne({ organizationId, email }, fields);
  });

  schema.static('deleteFor', async function deleteFor(organizationId, emailAddress) {
    const email = normalizeEmail(emailAddress);
    if (!email) throw new Error('Unable to remove: no email address was provided.');
    if (!organizationId) throw new Error('Unable to remove: no organization ID was provided.');
    return this.deleteOne({ organizationId, email });
  });

  schema.static('findForUser', async function findForUser(emailAddress, fields) {
    const email = normalizeEmail(emailAddress);
    if (!email) throw new Error('Unable to find: no email address was provided.');
    return this.find({ email }, fields);
  });

  schema.static('findForOrganization', async function findForOrganization(organizationId, fields) {
    if (!organizationId) throw new Error('Unable to find: no organization ID was provided.');
    return this.find({ organizationId }, fields);
  });
};
