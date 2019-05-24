const validator = require('validator');
const { Schema } = require('mongoose');
const connection = require('../connection');

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
  givenName: {
    type: String,
    trim: true,
  },
  familyName: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

schema.static('normalizeEmail', (email) => {
  if (!email) return '';
  return String(email).trim().toLowerCase();
});

schema.static('findByEmail', async function findByEmail(value, fields) {
  const email = connection.model('user').normalizeEmail(value);
  if (!email) throw new Error('Unable to find user: no email address was provided.');
  return this.findOne({ email }, fields);
});

module.exports = schema;
