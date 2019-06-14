const { createRequiredParamError } = require('@base-cms/micro').service;
const { createCIDR } = require('ip6addr');
const convert = require('./convert');

module.exports = ({ cidr }) => {
  if (!cidr) throw createRequiredParamError('cidr');

  const CIDR = createCIDR(cidr);
  const min = convert({ address: CIDR.first() });
  const max = convert({ address: CIDR.last() });

  return { min, max };
};
