const { Schema } = require('mongoose');
const { normalizeEmail } = require('@identity-x/utils');
const { emailValidator, applicationPlugin, localePlugin } = require('@identity-x/mongoose-plugins');
const { localeService } = require('@identity-x/service-clients');
const connection = require('../connection');
const accessLevelPlugin = require('./plugins/access-level');
const teamPlugin = require('./plugins/team');
const { isBurnerDomain } = require('../../utils/burner-email');

const stripLines = (value) => {
  if (!value) return undefined;
  const v = String(value);
  return v.replace(/[\r\n]/g, ' ').replace(/\s\s+/g, ' ');
};

const regionalConsentAnswerSchema = new Schema({
  given: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    required: true,
  },
});

/**
 * The built-in `_id` field of this sub-document represents
 * the custom select field id.
 */
const customSelectFieldAnswerSchema = new Schema({
  /**
   * The custom select field answer(s).
   *
   * These are always stored as an array of answered option IDs,
   * regardless if the question is single or multi.
   */
  values: {
    type: [Schema.Types.ObjectId],
    default: () => [],
  },
});

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
    trim: true,
    lowercase: true,
    validate: {
      validator(domain) {
        return !isBurnerDomain(domain);
      },
      message: props => `The email domain "${props.value}" is not allowed. Please enter a valid email address.`,
    },
  },
  displayName: {
    type: String,
    default() {
      const [displayName] = this.email.split('@');
      return displayName;
    },
  },
  verified: {
    type: Boolean,
    default: false,
  },
  banned: {
    type: Boolean,
    default: false,
  },
  /**
   * A general flag whether the user wishes to receive
   * email communications from the app/website.
   */
  receiveEmail: {
    type: Boolean,
    default: false,
  },
  regionalConsentAnswers: {
    type: [regionalConsentAnswerSchema],
    default: () => [],
  },
  lastLoggedIn: {
    type: Date,
  },
  lastSeen: {
    type: Date,
  },
  givenName: {
    type: String,
    trim: true,
    set: stripLines,
  },
  familyName: {
    type: String,
    trim: true,
    set: stripLines,
  },
  organization: {
    type: String,
    trim: true,
    set: stripLines,
  },
  organizationTitle: {
    type: String,
    trim: true,
    set: stripLines,
  },
  customSelectFieldAnswers: {
    type: [customSelectFieldAnswerSchema],
    default: () => [],
  },
}, { timestamps: true });

schema.plugin(applicationPlugin, { collateWhen: ['email'] });
schema.plugin(accessLevelPlugin);
schema.plugin(teamPlugin);
schema.plugin(localePlugin, { localeService });

schema.pre('validate', async function setDomain() {
  const { email } = this;
  const [, domain] = email.split('@');
  this.domain = domain;
});

schema.pre('save', async function updateComments() {
  if (this.isModified('banned')) {
    await connection.model('comment').updateMany({ appUserId: this._id }, { $set: { banned: this.banned } });
  }
});

schema.index({ applicationId: 1, email: 1 }, { unique: true });
schema.index({ email: 1, _id: 1 }, { collation: { locale: 'en_US' } });
schema.index({ updatedAt: 1, _id: 1 });
schema.index({ createdAt: 1, _id: 1 });
schema.index({ lastLoggedIn: 1, _id: 1 });

schema.static('normalizeEmail', normalizeEmail);

schema.static('findByEmail', async function findByEmail(applicationId, value, fields) {
  const email = normalizeEmail(value);
  if (!email) throw new Error('Unable to find user: no email address was provided.');
  if (!applicationId) throw new Error('Unable to find user: no application ID was provided.');
  return this.findOne({ applicationId, email }, fields);
});

module.exports = schema;
