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
}, { timestamps: true });

module.exports = schema;
