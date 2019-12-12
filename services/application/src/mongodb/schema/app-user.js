const { Schema } = require('mongoose');
const { normalizeEmail } = require('@base-cms/id-me-utils');
const { emailValidator, applicationPlugin } = require('@base-cms/id-me-mongoose-plugins');
const { localeService } = require('@base-cms/id-me-service-clients');
const accessLevelPlugin = require('./plugins/access-level');
const teamPlugin = require('./plugins/team');

const stripLines = (value) => {
  if (!value) return undefined;
  const v = String(value);
  return v.replace(/[\r\n]/g, ' ').replace(/\s\s+/g, ' ');
};

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
  },
  verified: {
    type: Boolean,
    default: false,
  },
  lastLoggedIn: {
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
  countryCode: {
    type: String,
    trim: true,
    uppercase: true,
    validate: {
      async validator(code) {
        if (!code) return true;
        return localeService.request('country.isValid', { code });
      },
      message: 'Invalid country code {VALUE}',
    },
  },
  countryName: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

schema.plugin(applicationPlugin, { collateWhen: ['email'] });
schema.plugin(accessLevelPlugin);
schema.plugin(teamPlugin);

schema.pre('validate', async function setDomain() {
  const { email } = this;
  const [, domain] = email.split('@');
  this.domain = domain;
});

schema.pre('validate', async function convertCountryCode() {
  const { countryCode } = this;
  if (!countryCode) {
    this.countryCode = undefined;
    return;
  }
  const obj = await localeService.request('country.asObject', { code: countryCode });
  if (!obj) {
    this.countryCode = countryCode;
    return;
  }
  this.countryCode = obj.code;
});

schema.pre('save', async function setCountryName() {
  const { countryCode } = this;
  this.countryName = countryCode ? await localeService.request('country.getName', { code: countryCode }) : undefined;
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
