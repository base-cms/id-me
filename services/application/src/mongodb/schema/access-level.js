const { Schema } = require('mongoose');
const {
  domainValidator,
  ipValidator,
  applicationPlugin,
} = require('@base-cms/id-me-mongoose-plugins');

const schema = new Schema({
  name: {
    type: String,
    required: true,
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

module.exports = schema;
