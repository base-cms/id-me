const assert = require('assert');
const range = require('../../src/actions/range');

const cases = [
  {
    cidr: '2001:0db8:85a3:0000:0000:8a2e:0370:7334/128',
    expected: {
      min: '179794713837856',
      max: '179794713837856',
    },
  },
  {
    cidr: 'fe80::/10',
    expected: {
      min: '33022',
      max: '18446744073709535230',
    },
  },
  {
    cidr: '10.0.0.0/8',
    expected: {
      min: '72057641282502656',
      max: '18374685427404570624',
    },
  },
  {
    cidr: '172.217.9.78/32',
    expected: {
      min: '5623264946801278976',
      max: '5623264946801278976',
    },
  },
  {
    cidr: '::ffff:172.217.9.78/128',
    expected: {
      min: '5623264946801278976',
      max: '5623264946801278976',
    },
  },
];

cases.forEach(({ cidr, expected }) => {
  const actual = range({ cidr });
  assert(`${actual.min}` === `${expected.min}`, `Expected cidr.min to be ${expected.min} but got ${actual.min}`);
  assert(`${actual.max}` === `${expected.max}`, `Expected cidr.max to be ${expected.max} but got ${actual.max}`);
});
