const { asyncRoute } = require('@base-cms/utils');
const { applicationService } = require('@base-cms/id-me-service-clients');
const { parse } = require('json2csv');

const fields = [
  '_id',
  'email',
  'domain',
  'verified',
  'lastLoggedIn',
  'givenName',
  'familyName',
  'organization',
  'organizationTitle',
  'countryCode',
  'countryName',
  'createdAt',
  'updatedAt',
];

module.exports = asyncRoute(async (req, res) => {
  const { applicationId } = req.params;
  const r = await applicationService.request('user.exportForApp', { applicationId, fields });

  res.set('Content-Type', 'text/plain');
  res.set('Content-Disposition', `attachment; filename="export-${applicationId}-${Date.now()}.csv"`);
  res.send(parse(r, { fields }));
});
