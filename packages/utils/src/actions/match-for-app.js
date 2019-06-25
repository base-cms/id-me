const { createRequiredParamError } = require('@base-cms/micro').service;
const buildRegex = require('../build-regex');

module.exports = async (Model, {
  applicationId,
  field,
  phrase,
  position = 'contains',
  fields,
  excludeIds,
}) => {
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!field) throw createRequiredParamError('field');
  if (!phrase) throw createRequiredParamError('phrase');

  const query = { applicationId, [field]: buildRegex(phrase, position) };
  if (Array.isArray(excludeIds) && excludeIds.length) {
    query._id = { $nin: excludeIds };
  }
  const sort = { [field]: 1 };

  return Model.find(query, fields, { sort });
};
