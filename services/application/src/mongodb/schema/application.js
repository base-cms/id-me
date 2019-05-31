const { Schema } = require('mongoose');
const { organizationPlugin } = require('@base-cms/id-me-mongoose-plugins');

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

schema.plugin(organizationPlugin);

module.exports = schema;
