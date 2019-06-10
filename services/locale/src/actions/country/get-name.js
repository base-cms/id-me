const countries = require('i18n-iso-countries');
const { createRequiredParamError } = require('@base-cms/micro').service;

module.exports = ({ code, lang = 'en' }) => {
  if (!code) throw createRequiredParamError('code');
  if (!countries.isValid(code)) return null;
  return countries.getName(code, lang) || null;
};
