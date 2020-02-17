const { Schema } = require('mongoose');
const { emailPlugin } = require('@identity-x/mongoose-plugins');

const schema = new Schema({
  date: {
    type: Date,
    required: true,
    default: () => (new Date()),
  },
  ua: {
    type: String,
    trim: true,
  },
  ip: {
    type: String,
    trim: true,
  },
  tokenId: {
    type: String,
    required: true,
    index: true,
  },
});

schema.plugin(emailPlugin, {
  options: { index: true },
});

module.exports = schema;
