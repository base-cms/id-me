const { Schema } = require('mongoose');
const emailPlugin = require('./shared/email-plugin');
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
}, { timestamps: true });

schema.plugin(emailPlugin, {
  connection,
  fieldOptions: { unique: true },
});

module.exports = schema;
