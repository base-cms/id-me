const { createRequiredParamError } = require('@base-cms/micro').service;
const AccessLevel = require('../../mongodb/models/access-level');

module.exports = async ({ id, fields }) => {
  if (!id) throw createRequiredParamError('id');
  return AccessLevel.findForApplication(id, fields);
};
