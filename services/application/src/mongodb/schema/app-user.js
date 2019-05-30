const { Schema } = require('mongoose');
const { normalizeEmail } = require('@base-cms/id-me-utils');
const { emailValidator } = require('@base-cms/id-me-mongoose-plugins');

const applicationSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const schema = new Schema({
  application: {
    type: applicationSchema,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    index: true,
    set: normalizeEmail,
    validate: emailValidator,
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

schema.virtual('domain').get(function domain() {
  const { email } = this;
  return email.split('@')[1];
});

schema.index({ 'application._id': 1, email: 1 }, { unique: true });

schema.static('normalizeEmail', normalizeEmail);

schema.static('findByEmail', async function findByEmail(value, fields) {
  const email = normalizeEmail(value);
  if (!email) throw new Error('Unable to find user: no email address was provided.');
  return this.findOne({ email }, fields);
});

module.exports = schema;
