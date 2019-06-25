const { createRequiredParamError } = require('@base-cms/micro').service;
const buildRegex = require('../build-regex');

module.exports = async (Model, {
  applicationId,
  field,
  phrase,
  position = 'contains',
  fields,
  pagination,
}) => {
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!field) throw createRequiredParamError('field');
  if (!phrase) throw createRequiredParamError('phrase');

  const query = { [field]: buildRegex(phrase, position) };
  const sort = { [field]: 1 };

  return Model.findForApplication(applicationId, fields, { sort, query, pagination });
};
