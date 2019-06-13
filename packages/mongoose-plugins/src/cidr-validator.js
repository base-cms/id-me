const { createCIDR } = require('ip6addr');

const { isArray } = Array;
const validate = (value) => {
  try {
    createCIDR(value);
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = {
  validator(value) {
    if (isArray(value)) return value.every(v => validate(v));
    return validate(value);
  },
  message: 'Invalid CIDR notation {VALUE}',
};
