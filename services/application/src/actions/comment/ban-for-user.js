const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;

const { Comment, AppUser } = require('../../mongodb/models');

module.exports = async ({ appUserId, banned = true } = {}) => {
  if (!appUserId) throw createRequiredParamError('applicationId');

  const user = await AppUser.findOne({ _id: appUserId }, ['id']);
  if (!user) throw createError(404, `No user was found for '${appUserId}'`);

  await Comment.updateMany({ appUserId }, { $set: { banned } });
  return { appUserId, banned };
};
