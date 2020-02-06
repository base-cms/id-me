const getName = require('./get-name');

module.exports = ({ countryCode, regionCode }) => {
  const name = getName({ countryCode, regionCode });
  return Boolean(name);
};
