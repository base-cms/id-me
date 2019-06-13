const { createCIDR, parse } = require('ip6addr');
const { createRequiredParamError } = require('@base-cms/micro').service;

module.exports = ({ address }) => {
  if (!address) throw createRequiredParamError('address');

  try {
    createCIDR(address);
    return true;
  } catch (e) {
    try {
      parse(address);
      return true;
    } catch (f) {
      return false;
    }
  }
};
