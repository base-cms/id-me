const { Schema } = require('mongoose');

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
}, { timestamps: true });

module.exports = schema;
