const { handleError } = require('@base-cms/id-me-utils').mongoose;
const { service } = require('@base-cms/micro');
const User = require('../mongodb/models/user');
const findByEmail = require('./find-by-email');

const { createRequiredParamError } = service;

module.exports = async ({ email, payload, fields } = {}) => {
  if (!email) throw createRequiredParamError('email');
  try {
    const user = new User({ ...payload, email });
    await user.validate();
    await User.update({ email }, { $setOnInsert: user }, { upsert: true });
    return findByEmail({ email, fields });
  } catch (e) {
    throw handleError(e);
  }
};
