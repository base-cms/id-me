const validator = require('validator');

module.exports = [
  {
    validator(email) {
      return validator.isEmail(email);
    },
    message: 'Invalid email address {VALUE}',
  },
];
