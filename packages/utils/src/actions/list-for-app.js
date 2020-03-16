const { createRequiredParamError } = require('@base-cms/micro').service;

module.exports = async (Model, {
  id,
  fields,
  query,
  sort,
  pagination,
}) => {
  if (!id) throw createRequiredParamError('id');
  return Model.findForApplication(id, fields, { query, sort, pagination });
};
