const { Schema } = require('mongoose');

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

module.exports = schema;
