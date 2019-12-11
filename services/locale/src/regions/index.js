const sortByName = require('../utils/sort-by-name');
const CA = require('./ca');
const US = require('./us');

const set = (data, countryCode) => Object.keys(data)
  .map(code => ({ code, ...data[code] }))
  .sort(sortByName)
  .reduce((o, { code, ...rest }) => ({
    ...o,
    [code]: {
      code: `${countryCode}-${code}`,
      countryCode,
      regionCode: code,
      ...rest,
    },
  }), {});

module.exports = {
  CA: set(CA, 'CA'),
  US: set(US, 'US'),
};
