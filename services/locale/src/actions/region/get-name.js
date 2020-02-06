const asObject = require('./as-object');

module.exports = ({ countryCode, regionCode }) => {
  const region = asObject({ countryCode, regionCode });
  return region ? region.name : null;
};
