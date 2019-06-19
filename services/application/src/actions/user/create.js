const { createError } = require('micro');
const { handleError } = require('@base-cms/id-me-utils').mongoose;
const { service } = require('@base-cms/micro');
const findByEmail = require('./find-by-email');
const { AppUser, Application } = require('../../mongodb/models');

const { createRequiredParamError } = service;

module.exports = async ({
  applicationId,
  email,
  payload,
  fields,
} = {}) => {
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!email) throw createRequiredParamError('email');

  const app = await Application.findById(applicationId, ['id']);
  if (!app) throw createError(404, `No application was found for '${applicationId}'`);

  try {
    const user = new AppUser({
      ...payload,
      applicationId,
      email,
      verified: false,
    });
    await user.validate();
    await AppUser.updateOne({ email, applicationId }, { $setOnInsert: user }, { upsert: true });
    return findByEmail({ applicationId, email, fields });
  } catch (e) {
    throw handleError(createError, e);
  }
};
