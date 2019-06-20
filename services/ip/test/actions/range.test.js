const assert = require('assert');
const range = require('../../src/actions/range');

const cases = [
  {
    cidr: '2001:0db8:85a3:0000:0000:8a2e:0370:7334/128',
    expected: {
      min: '20010db885a3000000008a2e03707334',
      max: '20010db885a3000000008a2e03707334',
    },
  },
  {
    cidr: 'fe80::/10',
    expected: {
      min: 'fe800000000000000000000000000001',
      max: 'febfffffffffffffffffffffffffffff',
    },
  },
  {
    cidr: '10.0.0.0/8',
    expected: {
      min: '00000000000000000000ffff0a000001',
      max: '00000000000000000000ffff0afffffe',
    },
  },
  {
    cidr: '172.217.9.78/32',
    expected: {
      min: '00000000000000000000ffffacd9094e',
      max: '00000000000000000000ffffacd9094e',
    },
  },
  {
    cidr: '::ffff:172.217.9.78/128',
    expected: {
      min: '00000000000000000000ffffacd9094e',
      max: '00000000000000000000ffffacd9094e',
    },
  },
];

cases.forEach(({ cidr, expected }) => {
  const actual = range({ cidr });
  assert(`${actual.min}` === `${expected.min}`, `Expected cidr.min to be ${expected.min} but got ${actual.min}`);
  assert(`${actual.max}` === `${expected.max}`, `Expected cidr.max to be ${expected.max} but got ${actual.max}`);
});
