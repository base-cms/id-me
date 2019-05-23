const { service } = require('@base-cms/micro');

const { createRequiredParamError } = service;

module.exports = async ({ key }) => {
  if (!key) throw createRequiredParamError('key');
  return { key };
};
