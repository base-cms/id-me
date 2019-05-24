const bcrypt = require('bcrypt');
const crypto = require('crypto');
const validator = require('validator');
const { Schema } = require('mongoose');
const connection = require('../connection');
const {
  deleteablePlugin,
  referencePlugin,
} = require('../plugins');

const organizationSchema = new Schema({
  role: {
    type: String,
    default: 'Member',
    required: true,
    enum: ['Restricted', 'Member', 'Administrator'],
  },
});

organizationSchema.plugin(referencePlugin, {
  name: '_id',
  modelName: 'organization',
  options: { required: true },
  connection,
});


const schema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
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
    required: true,
    trim: true,
  },
  familyName: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  logins: {
    type: Number,
    default: 0,
    min: 0,
  },
  lastLoggedInAt: {
    type: Date,
  },
  isEmailVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  photoURL: {
    type: String,
    trim: true,
    validate: {
      validator(v) {
        if (!v) return true;
        return validator.isURL(v, {
          protocols: ['http', 'https'],
          require_protocol: true,
        });
      },
      message: 'Invalid photo URL for {VALUE}',
    },
  },
}, {
  timestamps: true,
});

schema.plugin(deleteablePlugin, {
  index: { deleted: 1, email: 1 },
  indexOptions: { unique: true },
});

schema.static('validatePassword', (value, confirm) => {
  if (!value || !confirm) throw new Error('You must provide and confirm your password.');
  if (value.length < 6) throw new Error('Passwords must be at least six characters long.');
  if (value !== confirm) throw new Error('The password does not match the confirmation password.');
  return true;
});

/**
 * Hooks.
 */
schema.pre('save', async function setName() {
  this.name = `${this.givenName} ${this.familyName}`;
});

schema.pre('save', async function setPassword() {
  if (this.isModified('password') && !this.password.match(/^\$2[ayb]\$.{56}$/)) {
    this.password = await bcrypt.hash(this.password, 13);
  }
});

schema.pre('save', async function setPhotoURL() {
  if (!this.photoURL) {
    const hash = crypto.createHash('md5').update(this.email).digest('hex');
    this.photoURL = `https://www.gravatar.com/avatar/${hash}`;
  }
});

module.exports = schema;
