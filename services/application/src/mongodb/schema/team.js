const { Schema, Decimal128 } = require('mongoose');
const { parse, createCIDR } = require('ip6addr');
const {
  domainValidator,
  cidrValidator,
  applicationPlugin,
} = require('@base-cms/id-me-mongoose-plugins');
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

const ipToInt = addr => (addr.toBuffer().readBigUInt64LE(addr.kind() === 'ipv4' ? 8 : 0, true));

cidr.post('validate', function setCIDRValues() {
  const CIDR = createCIDR(this.value);
  try {
    this.v6 = CIDR.toString({ format: 'v4-mapped' });
    this.min = ipToInt(parse(CIDR.first().toString({ format: 'v4-mapped' }))).toString();
    this.max = ipToInt(parse(CIDR.last().toString({ format: 'v4-mapped' }))).toString();
  } catch (e) {
    this.v6 = CIDR.toString({ format: 'v6' });
    this.min = ipToInt(CIDR.first()).toString();
    this.max = ipToInt(CIDR.last()).toString();
  }
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
