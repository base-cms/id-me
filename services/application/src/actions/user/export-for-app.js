
const { service } = require('@base-cms/micro');
const { AppUser } = require('../../mongodb/models');

const { createRequiredParamError } = service;

module.exports = async ({
  applicationId,
  fields = [],
} = {}) => {
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!Array.isArray(fields)) throw createRequiredParamError('fields');
  const projection = fields.reduce((obj, k) => ({ ...obj, [k]: 1 }), {});
  const users = await AppUser.find({ applicationId }, projection);
  return users;
};
