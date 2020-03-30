const validator = require('validator');

module.exports = [
  {
    validator(email) {
      if (!email) return true;
      return validator.isEmail(email);
    },
    message: 'Invalid email address {VALUE}',
  },
];
