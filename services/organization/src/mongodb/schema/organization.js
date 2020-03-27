const { Schema } = require('mongoose');
const { stripLines } = require('@identity-x/utils');
const { localeService } = require('@identity-x/service-clients');
const { localePlugin } = require('@identity-x/mongoose-plugins');

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
  streetAddress: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
    set: stripLines,
  },
  phoneNumber: {
    type: String,
    trim: true,
    set: stripLines,
  },
  consentPolicy: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

schema.plugin(localePlugin, { localeService });

module.exports = schema;
