const { createCIDR, parse } = require('ip6addr');

const makev6 = (cidr) => {
  try {
    return cidr.toString({ format: 'v4-mapped' });
  } catch (e) {
    return cidr.toString({ format: 'v6' });
  }
};

module.exports = ({ address }) => {
  try {
    const cidr = createCIDR(address);
    return makev6(cidr);
  } catch (e) {
    // Single address, make into a CIDR range
    const addr = parse(address);
    const prefixLength = addr.kind() === 'ipv4' ? 32 : 128;
    const cidr = createCIDR(`${address}/${prefixLength}`);
    return makev6(cidr);
  }
};
