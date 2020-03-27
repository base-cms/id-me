const { updateForId } = require('@identity-x/utils').actions;

const Organization = require('../mongodb/models/organization');
const create = require('./create');
const findById = require('./find-by-id');
const updateContactInfo = require('./update-contact-info');
const updateField = require('./update-field');

module.exports = {
  create,
  findById,
  updateContactInfo,
  updateField,
  updateForId: params => updateForId(Organization, params),
};
