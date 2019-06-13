const { validateCIDR } = require('@base-cms/id-me-utils').ip6;

const { isArray } = Array;

module.exports = {
  validator(value) {
    if (isArray(value)) return value.every(v => validateCIDR(v));
    return validateCIDR(value);
  },
  message: 'Invalid CIDR notation {VALUE}',
};
