const { createRequiredParamError } = require('@base-cms/micro').service;
const Team = require('../../mongodb/models/team');

module.exports = async ({ id, fields }) => {
  if (!id) throw createRequiredParamError('id');
  return Team.findForApplication(id, fields);
};
