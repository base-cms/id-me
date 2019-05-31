const accessLevel = require('./access-level');
const create = require('./create');
const findById = require('./find-by-id');
const listForOrg = require('./list-for-org');
const updateField = require('./update-field');
const updateMany = require('./update-many');

const { keys } = Object;

const load = (root, obj) => keys(obj).reduce((o, key) => {
  const k = `${root}.${key}`;
  return { ...o, [k]: obj[key] };
}, {});

module.exports = {
  ...load('access-level', accessLevel),
  create,
  findById,
  listForOrg,
  updateField,
  updateMany,
};
