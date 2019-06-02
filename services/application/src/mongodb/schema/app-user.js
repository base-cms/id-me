const { Schema } = require('mongoose');
const { normalizeEmail } = require('@base-cms/id-me-utils');
const { emailValidator, applicationPlugin } = require('@base-cms/id-me-mongoose-plugins');
const accessLevelPlugin = require('./plugins/access-level');
const teamPlugin = require('./plugins/team');

const schema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    index: true,
    set: normalizeEmail,
    validate: emailValidator,
  },
  domain: {
    type: String,
    required: true,
  },
  givenName: {
    type: String,
    trim: true,
  },
  familyName: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

schema.plugin(applicationPlugin);
schema.plugin(accessLevelPlugin);
schema.plugin(teamPlugin);

schema.pre('save', async function domain() {
  const { email } = this;
  return email.split('@')[1];
});

schema.index({ applicationId: 1, email: 1 }, { unique: true });

schema.static('normalizeEmail', normalizeEmail);

schema.static('findByEmail', async function findByEmail(value, fields) {
  const email = normalizeEmail(value);
  if (!email) throw new Error('Unable to find user: no email address was provided.');
  return this.findOne({ email }, fields);
});

module.exports = schema;
