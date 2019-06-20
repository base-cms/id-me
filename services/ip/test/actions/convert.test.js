const assert = require('assert');
const convert = require('../../src/actions/convert');

const cases = [
  {
    address: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
    expected: '20010db885a3000000008a2e03707334',
  },
  {
    address: 'fe80::',
    expected: 'fe800000000000000000000000000000',
  },
  {
    address: '10.0.0.1',
    expected: '00000000000000000000ffff0a000001',
  },
  {
    address: '172.217.9.78',
    expected: '00000000000000000000ffffacd9094e',
  },
  {
    address: '127.0.0.1',
    expected: '00000000000000000000ffff7f000001',
  },
];

cases.forEach(({ address, expected }) => {
  const actual = convert({ address });
  assert(actual === expected, `Expected ${address} to convert to ${expected} but got ${actual}`);
});
