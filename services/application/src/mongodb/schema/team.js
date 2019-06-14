const { Schema, Decimal128 } = require('mongoose');
const { domainValidator, applicationPlugin } = require('@base-cms/id-me-mongoose-plugins');
const { ipService } = require('@base-cms/id-me-service-clients');
const accessLevelPlugin = require('./plugins/access-level');

const cidrSchema = new Schema({
  value: {
    type: String,
    required: true,
    validate: {
      validator: address => ipService.request('validate', { address }),
      message: 'Invalid IP Address or CIDR notation {VALUE}',
    },
  },
  min: Decimal128,
  max: Decimal128,
  v6: String,
});

cidrSchema.pre('save', async function setCIDRValues() {
  const cidr = await ipService.request('cidr', { address: this.value });
  const { min, max } = await ipService.request('range', { cidr });
  this.v6 = cidr;
  this.min = min;
  this.max = max;
});

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
  cidrs: {
    type: [cidrSchema],
    default: () => [],
  },
  domains: {
    type: [String],
    validate: domainValidator,
    default: () => [],
  },
  photoURL: String,
}, { timestamps: true });

schema.plugin(applicationPlugin);
schema.plugin(accessLevelPlugin);

module.exports = schema;
