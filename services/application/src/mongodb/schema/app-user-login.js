const { Schema } = require('mongoose');
const { emailPlugin, applicationPlugin } = require('@base-cms/id-me-mongoose-plugins');

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

schema.plugin(applicationPlugin);
schema.plugin(emailPlugin);

schema.index({ applicationId: 1, email: 1 });

module.exports = schema;
