const asObject = require('./as-object');

module.exports = ({ codes = [], lang = 'en', withFlag = true }) => {
  const objs = codes.map(code => asObject({ code, lang, withFlag })).filter(o => o);
  return objs;
};
