const validator = require('validator');

const { isArray } = Array;

module.exports = {
  validator(value) {
    if (isArray(value)) return value.every(v => validator.isIP(v));
    return validator.isIP(value);
  },
  message: 'Invalid IP address {VALUE}',
};
