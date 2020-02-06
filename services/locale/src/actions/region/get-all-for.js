const { createRequiredParamError } = require('@base-cms/micro').service;
const regions = require('../../regions');

module.exports = ({ countryCode, category }) => {
  if (!countryCode) throw createRequiredParamError('countryCode');
  const data = regions[countryCode.toUpperCase()];
  if (!data) return [];
  const values = Object.values(data);
  if (!category) return values;
  return values.filter(v => v.category === category);
};
