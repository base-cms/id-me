const countries = require('i18n-iso-countries');
const { createRequiredParamError } = require('@base-cms/micro').service;

module.exports = ({ code }) => {
  if (!code) throw createRequiredParamError('code');
  return countries.isValid(code);
};
