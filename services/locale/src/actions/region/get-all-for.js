const { createRequiredParamError } = require('@base-cms/micro').service;
const regions = require('../../regions');

module.exports = ({ countryCode }) => {
  if (!countryCode) throw createRequiredParamError('countryCode');
  const data = regions[countryCode.toUpperCase()];
  if (!data) return [];
  return Object.values(data);
};
