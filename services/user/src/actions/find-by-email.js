const { service } = require('@base-cms/micro');
const User = require('../mongodb/models/user');

const { createRequiredParamError } = service;

module.exports = async ({ email, fields }) => {
  if (!email) throw createRequiredParamError('email');
  const user = await User.findByEmail(email, fields);
  return user || null;
};
