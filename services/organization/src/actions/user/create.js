const { service } = require('@base-cms/micro');
const User = require('../../mongodb/models/user');
const handleError = require('../handle-error');
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
