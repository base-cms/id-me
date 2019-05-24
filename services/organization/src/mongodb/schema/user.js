const pushId = require('unique-push-id');
const uuid = require('uuid/v4');
const validator = require('validator');
const { Schema } = require('mongoose');
const connection = require('../connection');

const apiSchema = new Schema({
  key: {
    type: String,
    required: true,
    default: () => uuid(),
  },
  secret: {
    type: String,
    required: true,
    default: () => pushId(),
  },
});

const schema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate: [
      {
        validator(email) {
          return validator.isEmail(email);
        },
        message: 'Invalid email address {VALUE}',
      },
    ],
  },
  api: {
    type: apiSchema,
    default: () => ({}),
  },
  givenName: {
    type: String,
    required: true,
    trim: true,
  },
  familyName: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true });

schema.static('normalizeEmail', (email) => {
  if (!email) return '';
  return String(email).trim().toLowerCase();
});

schema.method('findByEmail', async function findByEmail(value, fields) {
  const email = connection.model('user').normalizeEmail(value);
  if (!email) throw new Error('Unable to find user: no email address was provided.');
  return this.findOne({ email }, fields);
});

module.exports = schema;
