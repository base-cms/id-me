const { Schema } = require('mongoose');
const { emailPlugin, orgRolePlugin } = require('@base-cms/id-me-mongoose-plugins');
const organizationPlugin = require('./plugins/organization');

const schema = new Schema({}, { timestamps: true });

schema.plugin(emailPlugin);
schema.plugin(orgRolePlugin);
schema.plugin(organizationPlugin);

module.exports = schema;
