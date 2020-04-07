const { Schema } = require('mongoose');
const { stripLines } = require('@identity-x/utils');
const { emailPlugin } = require('@identity-x/mongoose-plugins');

const companySchema = new Schema({
  name: {
    type: String,
    trim: true,
    set: stripLines,
  },
  streetAddress: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
    set: stripLines,
  },
  regionName: {
    type: String,
    trim: true,
    set: stripLines,
  },
  postalCode: {
    type: String,
    trim: true,
    set: stripLines,
  },
  phoneNumber: {
    type: String,
    trim: true,
    set: stripLines,
  },
});

companySchema.plugin(emailPlugin, { name: 'supportEmail', options: { required: false } });

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  photoURL: {
    type: String,
    trim: false,
    default() {
      return `https://robohash.org/${this.id}?set=set3&bgset=bg2`;
    },
  },
  consentPolicy: {
    type: String,
    trim: true,
  },
  emailConsentRequest: {
    type: String,
    trim: true,
  },
  company: {
    type: companySchema,
  },
}, { timestamps: true });

module.exports = schema;
