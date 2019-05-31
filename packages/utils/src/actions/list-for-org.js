const { createRequiredParamError } = require('@base-cms/micro').service;

module.exports = async (Model, { id, fields }) => {
  if (!id) throw createRequiredParamError('id');
  return Model.findForOrganization(id, fields);
};
