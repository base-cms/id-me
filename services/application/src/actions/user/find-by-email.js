const { service } = require('@base-cms/micro');
const AppUser = require('../../mongodb/models/app-user');

const { createRequiredParamError } = service;

module.exports = async ({ applicationId, email, fields }) => {
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!email) throw createRequiredParamError('email');
  const user = await AppUser.findByEmail(applicationId, email, fields);
  return user || null;
};
