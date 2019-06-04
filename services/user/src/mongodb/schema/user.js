const { Schema } = require('mongoose');
const { emailPlugin } = require('@base-cms/id-me-mongoose-plugins');
const crypto = require('crypto');
const connection = require('../connection');

const schema = new Schema({
  givenName: {
    type: String,
    trim: true,
  },
  familyName: {
    type: String,
    trim: true,
  },
  photoURL: {
    type: String,
    trim: false,
    default() {
      const hash = crypto.createHash('md5').update(this.email).digest('hex');
      return `https://www.gravatar.com/avatar/${hash}`;
    },
  },
}, { timestamps: true });

schema.plugin(emailPlugin, {
  options: { unique: true },
});

schema.static('findByEmail', async function findByEmail(value, fields) {
  const email = connection.model('user').normalizeEmail(value);
  if (!email) throw new Error('Unable to find user: no email address was provided.');
  return this.findOne({ email }, fields);
});

module.exports = schema;
