const { createRequiredParamError } = require('@base-cms/micro').service;
const buildRegex = require('../build-regex');

module.exports = async (Model, {
  applicationId,
  field,
  phrase,
  position = 'contains',
  fields,
  excludeIds,
  pagination,
  sort,
}) => {
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!field) throw createRequiredParamError('field');
  if (!phrase) throw createRequiredParamError('phrase');

  const query = { [field]: buildRegex(phrase, position) };
  if (Array.isArray(excludeIds) && excludeIds.length) {
    query._id = { $nin: excludeIds };
  }
  const defaultSort = { field, order: 'desc' };
  const payload = {
    sort: { ...defaultSort, sort },
    query,
    pagination,
  };
  return Model.findForApplication(applicationId, fields, payload);
};
