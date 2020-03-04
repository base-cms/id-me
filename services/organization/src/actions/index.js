const { updateForId } = require('@identity-x/utils').actions;

const Organization = require('../mongodb/models/organization');
const create = require('./create');
const findById = require('./find-by-id');
const updateField = require('./update-field');

module.exports = {
  create,
  findById,
  updateField,
  updateForId: params => updateForId(Organization, params),
};
