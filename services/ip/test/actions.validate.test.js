const assert = require('assert');
const validate = require('../src/actions/validate');

[
  '2001:0db8:85a3:0000:0000:8a2e:0370:7334/128',
  'fe80::/10',
  '10.0.0.0/8',
  '172.217.9.78/32',
].forEach(address => assert(validate({ address }) === true, `${address} should validate!`));

[
  'fe8g::/10',
  '192.168.0.256',
].forEach(address => assert(validate({ address }) === false, `${address} should not validate!`));
