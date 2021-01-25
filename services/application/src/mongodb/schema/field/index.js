const { Schema } = require('mongoose');
const { applicationPlugin } = require('@identity-x/mongoose-plugins');

const schema = new Schema({
  /**
   * The internal name of the field.
   */
  name: {
    type: String,
    required: true,
    trim: true,
  },

  /**
   * The user-facing field label.
   */
  label: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  discriminatorKey: '_type',
  timestamps: true,
});

schema.plugin(applicationPlugin);

module.exports = schema;
