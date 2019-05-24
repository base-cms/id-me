const { Schema } = require('mongoose');
const emailPlugin = require('./shared/email-plugin');
const orgRolePlugin = require('./shared/org-role-plugin');
const organizationPlugin = require('./shared/organization-plugin');

const schema = new Schema({}, { timestamps: true });

schema.plugin(emailPlugin);
schema.plugin(orgRolePlugin);
schema.plugin(organizationPlugin);

schema.index({ organizationId: 1, email: 1 }, { unique: true });

module.exports = schema;
