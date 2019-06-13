const { Schema, Decimal128 } = require('mongoose');
const { createCIDR, toInt } = require('@base-cms/id-me-utils').ip6;
const { domainValidator, applicationPlugin } = require('@base-cms/id-me-mongoose-plugins');
const { ipService } = require('@base-cms/id-me-service-clients');
const accessLevelPlugin = require('./plugins/access-level');

const cidrSchema = new Schema({
  value: {
    type: String,
    required: true,
    validate: {
      validator: address => ipService.request('validate', { address }),
      message: 'Invalid CIDR notation {VALUE}',
    },
  },
  min: Decimal128,
  max: Decimal128,
  v6: String,
});

  const CIDR = createCIDR(this.value);
  try {
    this.v6 = CIDR.toString({ format: 'v4-mapped' });
  } catch (e) {
    this.v6 = CIDR.toString({ format: 'v6' });
  }
  this.min = toInt(CIDR.first());
  this.max = toInt(CIDR.last());
cidrSchema.post('validate', async function setCIDRValues() {
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
}, { timestamps: true });

schema.plugin(applicationPlugin);
schema.plugin(accessLevelPlugin);

module.exports = schema;
