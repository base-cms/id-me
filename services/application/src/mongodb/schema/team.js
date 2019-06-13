const { Schema, Decimal128 } = require('mongoose');
const { ip6: { createCIDR, toInt } } = require('@base-cms/id-me-utils');
const { domainValidator, cidrValidator, applicationPlugin } = require('@base-cms/id-me-mongoose-plugins');
const accessLevelPlugin = require('./plugins/access-level');

const cidr = new Schema({
  value: {
    type: String,
    required: true,
    validate: cidrValidator,
  },
  min: Decimal128,
  max: Decimal128,
  v6: String,
});

cidr.post('validate', function setCIDRValues() {
  const CIDR = createCIDR(this.value);
  try {
    this.v6 = CIDR.toString({ format: 'v4-mapped' });
  } catch (e) {
    this.v6 = CIDR.toString({ format: 'v6' });
  }
  this.min = toInt(CIDR.first());
  this.max = toInt(CIDR.last());
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
    type: [cidr],
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
