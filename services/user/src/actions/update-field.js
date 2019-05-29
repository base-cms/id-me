const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const findByEmail = require('./find-by-email');

module.exports = async ({
  email,
  path,
  value,
  fields,
} = {}) => {
  if (!email) throw createRequiredParamError('email');
  if (!path) throw createRequiredParamError('path');
  const v = value === undefined || value === null ? undefined : value;

  const user = await findByEmail({ email, fields });
  if (!user) throw createError(404, `No user found for ${email}.`);
  user.set(path, v);

  return user.save();
};
