const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const { applicationService } = require('@base-cms/id-me-service-clients');
const Organization = require('../mongodb/models/organization');

module.exports = async ({
  id,
  path,
  value,
  fields,
} = {}) => {
  if (!id) throw createRequiredParamError('id');
  if (!path) throw createRequiredParamError('path');
  const v = value === undefined || value === null ? undefined : value;

  const org = await Organization.findById(id, fields);
  if (!org) throw createError(404, `No organization found for ID ${id}.`);
  org.set(path, v);

  await org.save();

  if (path === 'name') {
    // Update org name on all related apps.
    const apps = await applicationService.request('listForOrg', { id, fields: ['id'] });
    const appIds = apps.map(({ _id }) => _id);
    await applicationService.request('updateMany', {
      filter: { _id: { $in: appIds } },
      update: { $set: { 'organization.name': value } },
    });
  }

  return org;
};
