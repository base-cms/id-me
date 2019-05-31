const validator = require('validator');

const { isArray } = Array;

module.exports = {
  validator(value) {
    if (isArray(value)) return value.every(v => validator.isFQDN(v));
    return validator.isFQDN(value);
  },
  message: 'Invalid domain name address {VALUE}',
};
