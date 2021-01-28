const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const { handleError } = require('@identity-x/utils').mongoose;

const { AppUser } = require('../../mongodb/models');

const { isArray } = Array;

module.exports = async ({ id, applicationId, answers } = {}) => {
  if (!id) throw createRequiredParamError('id');
  if (!applicationId) throw createRequiredParamError('applicationId');

  const user = await AppUser.findByIdForApp(id, applicationId);
  if (!user) throw createError(404, `No user was found for '${id}'`);

  // do not update user answers when passed answers are not an array
  if (!isArray(answers)) return user;

  const toSet = answers
    .filter(({ optionIds }) => optionIds.length) // ignore/unset fields without options
    .map(({ fieldId, optionIds }) => ({ _id: fieldId, values: optionIds }));

  user.set('customSelectFieldAnswers', toSet);
  try {
    await user.save();
    return user;
  } catch (e) {
    throw handleError(createError, e);
  }
};
