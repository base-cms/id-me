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

  /**
   * Whether the field is globally required.
   */
  required: {
    type: Boolean,
    default: false,
  },

  /**
   * Whether the field is currently active
   */
  active: {
    type: Boolean,
    default: true,
  },
}, {
  discriminatorKey: '_type',
  timestamps: true,
});

schema.plugin(applicationPlugin, { collateWhen: ['name', 'label'] });

schema.index({ name: 1, _id: 1 }, { collation: { locale: 'en_US' } });
schema.index({ label: 1, _id: 1 }, { collation: { locale: 'en_US' } });
schema.index({ updatedAt: 1, _id: 1 });
schema.index({ createdAt: 1, _id: 1 });

module.exports = schema;
