const { handleError } = require('@base-cms/id-me-utils').mongoose;
const { isObject } = require('@base-cms/utils');
const { service } = require('@base-cms/micro');
const Organization = require('../mongodb/models/organization');

const { createRequiredParamError } = service;

module.exports = async ({ payload } = {}) => {
  if (!isObject(payload)) throw createRequiredParamError('payload');
  try {
    const org = await Organization.create(payload);
    return org;
  } catch (e) {
    throw handleError(e);
  }
};
