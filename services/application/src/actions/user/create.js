const { createError } = require('micro');
const { handleError } = require('@base-cms/id-me-utils').mongoose;
const { service } = require('@base-cms/micro');
const AppUser = require('../../mongodb/models/app-user');
const findByEmail = require('./find-by-email');

const { createRequiredParamError } = service;

module.exports = async ({
  applicationId,
  email,
  payload,
  fields,
} = {}) => {
  if (!email) throw createRequiredParamError('email');
  try {
    const user = new AppUser({ ...payload, applicationId, email });
    await user.validate();
    await AppUser.update({ email }, { $setOnInsert: user }, { upsert: true });
    return findByEmail({ applicationId, email, fields });
  } catch (e) {
    throw handleError(createError, e);
  }
};
