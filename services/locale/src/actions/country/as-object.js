const countries = require('i18n-iso-countries');
const { createRequiredParamError } = require('@base-cms/micro').service;
const getEmoji = require('./utils/get-emoji');

module.exports = ({ code, lang = 'en', withFlag = true }) => {
  if (!code) throw createRequiredParamError('code');
  if (!countries.isValid(code)) return null;
  const name = countries.getName(code, lang);
  const alpha2 = countries.getAlpha2Code(name, lang);
  if (!alpha2) return null;
  const obj = {
    code: alpha2,
    name: countries.getName(code, lang),
  };
  if (withFlag) obj.flag = getEmoji(alpha2);
  return obj;
};
