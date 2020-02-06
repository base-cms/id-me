const sortByName = require('../utils/sort-by-name');
const countryObject = require('../actions/country/as-object');
const CA = require('./ca');
const MX = require('./mx');
const US = require('./us');

const set = (data, countryCode) => {
  const country = countryObject({ code: countryCode });
  return Object.keys(data)
    .map(code => ({ code, ...data[code] }))
    .sort(sortByName)
    .reduce((o, { code, ...rest }) => ({
      ...o,
      [code]: {
        code: `${countryCode}-${code}`,
        regionCode: code,
        country,
        ...rest,
      },
    }), {});
};

module.exports = {
  CA: set(CA, 'CA'),
  MX: set(MX, 'MX'),
  US: set(US, 'US'),
};
