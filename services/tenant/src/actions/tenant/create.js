const { createError } = require('micro');
const { isObject } = require('@base-cms/utils');
const { service } = require('@base-cms/micro');
const Tenant = require('../../mongodb/models/tenant');
const isDuplicateKeyError = require('../../mongodb/utils/is-duplicate-key-error');
const isValidationError = require('../../mongodb/utils/is-validation-error');

const { createRequiredParamError } = service;

module.exports = async ({ payload } = {}) => {
  if (!isObject(payload)) throw createRequiredParamError('payload');
  try {
    const tenant = await Tenant.create(payload);
    return tenant;
  } catch (e) {
    if (isValidationError(e) || isDuplicateKeyError(e)) throw createError(422, e.message);
    throw e;
  }
};
