const { service } = require('@base-cms/micro');

const { createRequiredParamError } = service;

module.exports = (params = {}) => {
  Object.keys(params).forEach((key) => {
    if (!params[key]) throw createRequiredParamError(key);
  });
};
