const { isObject } = require('@base-cms/utils');
const { service } = require('@base-cms/micro');
const User = require('../../mongodb/models/user');
const handleError = require('../handle-error');

const { createRequiredParamError } = service;

module.exports = async ({ payload } = {}) => {
  if (!isObject(payload)) throw createRequiredParamError('payload');
  try {
    const tenant = await User.create(payload);
    return tenant;
  } catch (e) {
    throw handleError(e);
  }
};
