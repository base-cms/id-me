const { createRequiredParamError } = require('@base-cms/micro').service;

module.exports = ({ user, policyId, given }) => {
  if (!policyId) throw createRequiredParamError('policyId');

  const now = new Date();
  const policy = user.regionalConsentAnswers.id(policyId);
  if (policy) {
    policy.set('date', now);
    policy.set('given', given);
  } else {
    user.regionalConsentAnswers.push({ _id: policyId, given, date: now });
  }
};
