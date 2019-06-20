const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const { ipService } = require('@base-cms/id-me-service-clients');
const findByEmail = require('./user/find-by-email');
const { Application, Team, AccessLevel } = require('../mongodb/models');

const { isArray } = Array;

const getAsArray = v => (isArray(v) ? v : []);

module.exports = async ({ applicationId, email, ipAddress } = {}) => {
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!ipAddress) throw createRequiredParamError('ipAddress');

  const hex = await ipService.request('convert', { address: ipAddress });
  const ip = Buffer.from(hex, 'hex');

  const accessLevelIds = [];
  const teamQuery = {
    applicationId,
    $or: [{
      cidrs: {
        $elemMatch: {
          min: { $lte: ip },
          max: { $gte: ip },
        },
      },
    }],
  };

  const [app, user] = await Promise.all([
    Application.findById(applicationId, ['id']),
    (email ? findByEmail({ applicationId, email }) : null),
  ]);

  if (!app) throw createError(404, `No application was found for '${applicationId}'`);

  if (user) {
    const userTeamIds = getAsArray(user.teamIds);
    getAsArray(user.accessLevelIds).forEach(id => accessLevelIds.push(id));
    const { domain } = user;
    if (userTeamIds.length) teamQuery.$or.push({ _id: { $in: userTeamIds } });
    if (domain) teamQuery.$or.push({ domains: domain });
  }

  const mergedTeams = await Team.find(teamQuery);
  mergedTeams.forEach((team) => {
    getAsArray(team.accessLevelIds).forEach(id => accessLevelIds.push(id));
  });

  const accessLevelQuery = { applicationId, _id: { $in: accessLevelIds } };
  const mergedAccessLevels = await AccessLevel.find(accessLevelQuery);

  return {
    user,
    mergedTeams,
    mergedAccessLevels,
    hasTeams: Boolean(mergedTeams.length),
    hasUser: Boolean(user),
  };
};
