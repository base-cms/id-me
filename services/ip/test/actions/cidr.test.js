const assert = require('assert');
const cidr = require('../../src/actions/cidr');

const cases = [
  {
    address: '2001:0db8:85a3:0000:0000:8a2e:0370:7334/128',
    expected: '2001:db8:85a3::8a2e:370:7334/128',
  },
  {
    address: 'fe80::/10',
    expected: 'fe80::/10',
  },
  {
    address: '10.0.0.0/8',
    expected: '::ffff:10.0.0.0/104',
  },
  {
    address: '172.217.9.78',
    expected: '::ffff:172.217.9.78/128',
  },
  {
    address: '172.217.9.78/32',
    expected: '::ffff:172.217.9.78/128',
  },
];

cases.forEach(({ address, expected }) => {
  const actual = cidr({ address });
  assert(actual === expected, `Expected ${address} to convert to ${expected} but got ${actual}`);
});
