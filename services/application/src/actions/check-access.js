const { createRequiredParamError } = require('@base-cms/micro').service;
const { AccessLevel } = require('../mongodb/models');
const loadContext = require('./load-context');

const { isArray } = Array;

const getAsArray = v => (isArray(v) ? v : []);

const isLoggedIn = ({ hasUser, hasTeams }) => (hasUser || hasTeams);

const canAccess = (enabled, { requiresAccessLevel, hasAccessLevel }, context) => {
  if (!enabled) return true;
  if (requiresAccessLevel && !hasAccessLevel) return false;
  return isLoggedIn(context);
};

module.exports = async ({
  applicationId,
  email,
  ipAddress,
  isEnabled,
  requiredAccessLevelIds,
} = {}) => {
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!ipAddress) throw createRequiredParamError('ipAddress');

  const accessLevelIds = getAsArray(requiredAccessLevelIds);
  const [context, requiredAccessLevels] = await Promise.all([
    loadContext({ applicationId, email, ipAddress }),
    (accessLevelIds.length
      ? AccessLevel.find({ applicationId, _id: { $in: accessLevelIds } })
      : []
    ),
  ]);
  // Whether this item requires an access level.
  const requiresAccessLevel = Boolean(requiredAccessLevels.length);

  // The access level IDs found in the current context.
  const foundAccessLevelIds = context.mergedAccessLevels.map(level => `${level.id}`);

  // The required access level IDs (that were found/verified in the database).
  const verifiedAccessLevelIds = requiredAccessLevels.map(level => `${level.id}`);

  // Whether the context contains at least one required access level.
  const hasRequiredAccessLevel = verifiedAccessLevelIds
    .some(id => foundAccessLevelIds.includes(id));

  return {
    canAccess: canAccess(isEnabled, {
      requiresAccessLevel,
      hasAccessLevel: hasRequiredAccessLevel,
    }, context),
    isLoggedIn: isLoggedIn(context),
    hasRequiredAccessLevel,
    requiresAccessLevel,
    requiredAccessLevels,
    messages: (requiredAccessLevels[0] || {}).messages,
  };
};
