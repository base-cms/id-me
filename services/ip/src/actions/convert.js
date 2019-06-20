const { parse } = require('ip6addr');
const { createRequiredParamError } = require('@base-cms/micro').service;

const toIpv6 = (address) => {
  const addr = parse(address);
  try {
    return addr.toString({ format: 'v4-mapped' });
  } catch (e) {
    return addr.toString({ format: 'v6' });
  }
};

module.exports = ({ address }) => {
  if (!address) throw createRequiredParamError('address');
  const addr = parse(toIpv6(address));
  return addr.toBuffer().toString('hex');
};
