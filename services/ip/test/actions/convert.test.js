const assert = require('assert');
const convert = require('../../src/actions/convert');

const cases = [
  {
    address: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
    expected: '179794713837856',
  },
  {
    address: 'fe80::',
    expected: '33022',
  },
  {
    address: '10.0.0.1',
    expected: '72057641282502656',
  },
  {
    address: '172.217.9.78',
    expected: '5623264946801278976',
  },
  {
    address: '127.0.0.1',
    expected: '72058143793676288',
  },
];

cases.forEach(({ address, expected }) => {
  const actual = convert({ address });
  assert(actual === expected, `Expected ${address} to convert to ${expected} but got ${actual}`);
});
