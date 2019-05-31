const { Schema } = require('mongoose');
const {
  domainValidator,
  ipValidator,
  applicationPlugin,
} = require('@base-cms/id-me-mongoose-plugins');
const accessLevelPlugin = require('./plugins/access-level');

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
  ipAddresses: {
    type: [String],
    validate: ipValidator,
    default: () => [],
  },
  domains: {
    type: [String],
    validate: domainValidator,
    default: () => [],
  },
}, { timestamps: true });

schema.plugin(applicationPlugin);
schema.plugin(accessLevelPlugin);

module.exports = schema;
