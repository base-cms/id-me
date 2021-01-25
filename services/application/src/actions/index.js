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
const addContext = require('./add-context');
const comment = require('./comment');
const commentStream = require('./comment-stream');
const checkAccess = require('./check-access');
const create = require('./create');
const field = require('./field');
const loadContext = require('./load-context');
const removeContext = require('./remove-context');
const team = require('./team');
const updateContext = require('./update-context');
const user = require('./user');

module.exports = {
  'access-level': accessLevel,
  addContext,
  comment,
  'comment-stream': commentStream,
  field,
  team,
  user,
  checkAccess,
  create,
  loadContext,
  find: params => find(Application, params),
  findById: params => findById(Application, params),
  listForOrg: params => listForOrg(Application, params),
  removeContext,
  updateContext,
  updateField: params => updateField(Application, params),
  updateForId: params => updateForId(Application, params),
  updateMany: params => updateMany(Application, params),
};
