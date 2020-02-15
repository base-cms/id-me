const { Schema } = require('mongoose');
const { organizationPlugin } = require('@identity-x/mongoose-plugins');
const { normalizeEmail } = require('@identity-x/utils');
const { emailValidator } = require('@identity-x/mongoose-plugins');

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    set: normalizeEmail,
    validate: emailValidator,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

schema.plugin(organizationPlugin);

module.exports = schema;
