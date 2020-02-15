const { Schema } = require('mongoose');
const { applicationPlugin } = require('@identity-x/mongoose-plugins');

const messagesSchema = new Schema({
  loggedInNoAccess: {
    type: String,
    trim: true,
    default: '<p>In order to access this content, you must have an active subscription.</p>',
  },
  loggedOutNoAccess: {
    type: String,
    trim: true,
    default: '<p>In order to access this content, you must be logged-in and have an active subscription.</p>',
  },
}, { _id: false });

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
  messages: {
    type: messagesSchema,
    default: () => ({}),
  },
}, { timestamps: true });

schema.plugin(applicationPlugin, { collateWhen: ['name'] });

schema.index({ name: 1, _id: 1 }, { collation: { locale: 'en_US' } });
schema.index({ updatedAt: 1, _id: 1 });
schema.index({ createdAt: 1, _id: 1 });

module.exports = schema;
