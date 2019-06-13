const { parse } = require('ip6addr');
/**
 * Returns an ipv6 string representation of the given IP address.
 *
 * @param address [String|ip6addr.Addr] A string value, or an ip6addr.Addr instance
 * @throws  If the input is invalid
 */
module.exports = (address) => {
  const addr = address.kind ? address : parse(address);
  try {
    return addr.toString({ format: 'v4-mapped' });
  } catch (e) {
    return addr.toString({ format: 'v6' });
  }
};
