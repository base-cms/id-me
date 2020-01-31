const countries = require('i18n-iso-countries');
const { createRequiredParamError } = require('@base-cms/micro').service;

module.exports = ({ name, lang = 'en' }) => {
  if (!name) throw createRequiredParamError('name');
  return countries.getAlpha2Code(name, lang);
};
