const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const findByEmail = require('./find-by-email');

module.exports = async ({
  email,
  payload,
  fields,
} = {}) => {
  if (!email) throw createRequiredParamError('email');

  const user = await findByEmail({ email, fields });
  if (!user) throw createError(404, `No user found for ${email}.`);
  user.set({ ...payload });

  return user.save();
};
