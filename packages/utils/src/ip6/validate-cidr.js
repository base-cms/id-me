const { createCIDR } = require('ip6addr');

module.exports = (value) => {
  try {
    createCIDR(value);
    return true;
  } catch (e) {
    return false;
  }
};
