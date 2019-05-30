const validator = require('validator');

module.exports = [
  {
    validator(value) {
      return validator.isIP(value);
    },
    message: 'Invalid IP address {VALUE}',
  },
];
