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

const { keys } = Object;

const load = (root, obj) => keys(obj).reduce((o, key) => {
  const k = `${root}.${key}`;
  return { ...o, [k]: obj[key] };
}, {});

module.exports = {
  ...load('access-level', accessLevel),
  ...load('team', team),
  ...load('user', user),
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
