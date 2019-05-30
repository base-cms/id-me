const validator = require('validator');

module.exports = [
  {
    validator(value) {
      return validator.isFQDN(value);
    },
    message: 'Invalid domain name address {VALUE}',
  },
];
