const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const { isObject, asArray } = require('@base-cms/utils');
const setConsentAnswer = require('./utils/set-regional-consent-answer');

const { AppUser } = require('../../mongodb/models');

module.exports = async ({ applicationId, email, payload } = {}) => {
  if (!email) throw createRequiredParamError('email');
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!isObject(payload)) throw createRequiredParamError('payload');

  const user = await AppUser.findByEmail(applicationId, email);
  if (!user) throw createError(404, `No user was found for '${email}'`);

  // do nothing if the user is already verified.
  if (user.verified) return user;

  const { regionalConsentAnswers, ...fields } = payload;

  // overwrite/set regional consent answers
  user.set('regionalConsentAnswers', []);
  asArray(regionalConsentAnswers).forEach(({ policyId, given }) => {
    setConsentAnswer({ user, policyId, given });
  });

  // set fields
  user.set(fields);
  return user.save();
};
