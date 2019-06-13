const { createCIDR } = require('ip6addr');
const toInt = require('./to-int');
const toIpv6 = require('./to-ipv6');
const validateCIDR = require('./validate-cidr');

module.exports = {
  createCIDR,
  toInt,
  toIpv6,
  validateCIDR,
};
