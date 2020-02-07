const regions = require('../../regions');

const hasFilter = v => Array.isArray(v) && v.length;

module.exports = ({ countryCodes, categories }) => {
  const values = Object.keys(regions).reduce((arr, key) => {
    arr.push(...Object.values(regions[key]));
    return arr;
  }, []);
  if (!hasFilter(countryCodes) && !hasFilter(categories)) return values;
  if (hasFilter(countryCodes) && !hasFilter(categories)) {
    return values.filter(v => countryCodes.includes(v.country.code));
  }
  if (!hasFilter(countryCodes) && hasFilter(categories)) {
    return values.filter(v => categories.includes(v.category));
  }
  return values
    .filter(v => countryCodes.includes(v.country.code) && categories.includes(v.category));
};
