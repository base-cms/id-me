const { Schema } = require('mongoose');
const { emailPlugin, orgRolePlugin } = require('@identity-x/mongoose-plugins');
const organizationPlugin = require('./plugins/organization');

const schema = new Schema({}, { timestamps: true });

schema.plugin(emailPlugin, {
  options: { index: true },
});
schema.plugin(emailPlugin, {
  name: 'invitedByEmail',
});
schema.plugin(orgRolePlugin);
schema.plugin(organizationPlugin);

module.exports = schema;
