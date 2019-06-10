const countries = require('i18n-iso-countries');
const getEmoji = require('./utils/get-emoji');

const { isArray } = Array;

module.exports = ({
  lang = 'en',
  prioritize = ['US', 'CA'],
  withFlag = true,
}) => {
  // Must clone this data, otherwise deleting keys will remain sticky.
  const data = { ...countries.getNames(lang) };

  const top = (isArray(prioritize) && prioritize.length ? prioritize : [])
    .filter(code => code)
    .map(code => code.toUpperCase())
    .reduce((o, code) => {
      const value = data[code];
      if (value) {
        delete data[code];
        return { ...o, [code]: value };
      }
      return o;
    }, {});

  const ordered = { ...top, ...data };
  return Object.keys(ordered).map((code) => {
    const obj = { code, name: ordered[code] };
    if (!withFlag) return obj;
    obj.flag = getEmoji(code);
    return obj;
  });
};
