const { Schema } = require('mongoose');
const { organizationPlugin } = require('@base-cms/id-me-mongoose-plugins');
const { normalizeEmail } = require('@base-cms/id-me-utils');
const { emailValidator } = require('@base-cms/id-me-mongoose-plugins');

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    set: normalizeEmail,
    validate: emailValidator,
  },
  description: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

schema.plugin(organizationPlugin);

module.exports = schema;
