const {
  findById,
  find,
  listForOrg,
  updateField,
  updateMany,
  updateForId,
} = require('@identity-x/utils').actions;

const Application = require('../mongodb/models/application');

const accessLevel = require('./access-level');
const checkAccess = require('./check-access');
const create = require('./create');
const loadContext = require('./load-context');
const team = require('./team');
const user = require('./user');

module.exports = {
  'access-level': accessLevel,
  team,
  user,
  checkAccess,
  create,
  loadContext,
  find: params => find(Application, params),
  findById: params => findById(Application, params),
  listForOrg: params => listForOrg(Application, params),
  updateField: params => updateField(Application, params),
  updateForId: params => updateForId(Application, params),
  updateMany: params => updateMany(Application, params),
};
