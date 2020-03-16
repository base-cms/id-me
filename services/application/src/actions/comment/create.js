const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const { handleError } = require('@identity-x/utils').mongoose;
const { isObject } = require('@base-cms/utils');

const createStream = require('../comment-stream/create');

const { Application, Comment, AppUser } = require('../../mongodb/models');

module.exports = async ({
  applicationId,
  appUserId,
  displayName,
  stream,
  body,
} = {}, { req }) => {
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!appUserId) throw createRequiredParamError('appUserId');
  if (!body) throw createRequiredParamError('body');
  if (!isObject(stream)) throw createRequiredParamError('stream');

  const [application, user] = await Promise.all([
    Application.findById(applicationId, ['id']),
    AppUser.findOne({ _id: appUserId, applicationId }, ['id', 'banned', 'verified', 'email', 'displayName']),
  ]);

  if (!application) throw createError(404, `No application was found for '${applicationId}'`);
  if (!user) throw createError(404, `No user was found for '${appUserId}' using app '${applicationId}'`);
  if (!user.verified) throw createError(401, 'The provided user is not verified.');

  const promises = [];
  // Create/upsert the stream.
  promises.push(createStream({ applicationId, payload: stream }));

  // Update the display name if set and different.
  if (displayName && displayName !== user.displayName) {
    promises.push(AppUser.updateOne({ _id: user._id }, { $set: { displayName } }));
  }

  const [streamData] = await Promise.all(promises);
  if (streamData.archived) throw createError(400, 'This comment stream has been archived and no longer accepts posts.');

  const comment = new Comment({
    applicationId: application._id,
    streamId: streamData._id,
    appUserId: user._id,
    body,
    approved: true, // @todo determine when this should be auto-approved.
    banned: user.banned,
    ipAddress: req.headers['x-forward-for'] || req.connection.remoteAddress,
  });

  try {
    await comment.save();
    return comment;
  } catch (e) {
    throw handleError(createError, e);
  }
};
