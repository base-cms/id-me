const { Schema } = require('mongoose');

const optionSchema = new Schema({
  /**
   * The option label. This is value the user will see.
   */
  label: {
    type: String,
    required: true,
    trim: true,
  },

  /**
   * The option index number. Used for sorting.
   */
  index: {
    type: Number,
    default: 0,
  },
});

const schema = new Schema({
  /**
   * Whether this select field supports multiple answers.
   */
  multiple: {
    type: Boolean,
    default: false,
  },

  /**
   * The select options.
   */
  options: {
    type: [optionSchema],
    default: () => [],
  },
});

module.exports = schema;
