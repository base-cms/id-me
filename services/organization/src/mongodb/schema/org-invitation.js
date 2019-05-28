const { Schema } = require('mongoose');
const connection = require('../connection');
const emailPlugin = require('./shared/email-plugin');
const orgRolePlugin = require('./shared/org-role-plugin');
const organizationPlugin = require('./shared/organization-plugin');

const schema = new Schema({}, { timestamps: true });

schema.plugin(emailPlugin, { connection });
schema.plugin(orgRolePlugin);
schema.plugin(organizationPlugin);

schema.index({ organizationId: 1, email: 1 }, { unique: true });

module.exports = schema;
