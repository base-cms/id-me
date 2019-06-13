const { parse } = require('ip6addr');
const toIpv6 = require('./to-ipv6');

/**
 * Returns a string representation of the int value of the given ip address
 * @param addr [String|ip6addr.Addr] A string value, or an ip6addr.Addr instance
 * @throws  If the input is invalid
 */
module.exports = (address) => {
  const addr = parse(toIpv6(address));
  const offset = addr.kind() === 'ipv4' ? 8 : 0;
  return addr.toBuffer().readBigUInt64LE(offset, true).toString();
};
