const regions = require('../../regions');

module.exports = ({ category }) => {
  const values = Object.keys(regions).reduce((arr, key) => {
    arr.push(...Object.values(regions[key]));
    return arr;
  }, []);
  if (!category) return values;
  return values.filter(v => v.category === category);
};
