const { createRequiredParamError } = require('@base-cms/micro').service;
const regions = require('../../regions');

module.exports = ({ countryCode, regionCode }) => {
  if (!countryCode) throw createRequiredParamError('countryCode');
  if (!regionCode) throw createRequiredParamError('regionCode');
  const data = regions[countryCode.toUpperCase()];
  if (!data) return null;
  const region = data[regionCode.toUpperCase()];
  return region || null;
};
