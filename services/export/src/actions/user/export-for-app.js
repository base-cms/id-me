const { createError } = require('micro');
const { service } = require('@base-cms/micro');
const { applicationService, organizationService } = require('@identity-x/service-clients');
const { getAsArray } = require('@base-cms/object-path');
const { AsyncParser } = require('json2csv');
const newrelic = require('../../newrelic');
const { sendFailure, sendSuccess, streamResults } = require('../../utils');
const { upload } = require('../../s3');
const { AWS_S3_BUCKET_NAME } = require('../../env');

const { createRequiredParamError } = service;

module.exports = async ({
  email,
  applicationId,
  fields = [
    '_id',
    'email',
    'domain',
    'verified',
    'receiveEmail',
    'lastLoggedIn',
    'givenName',
    'familyName',
    'organization',
    'organizationTitle',
    'regionCode',
    'regionName',
    'countryCode',
    'countryName',
    'postalCode',
    'createdAt',
    'updatedAt',
  ],
} = {}) => {
  if (!email) throw createRequiredParamError('email');
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!Array.isArray(fields) || !fields.length) throw createRequiredParamError('fields');

  // load the app and org
  const app = await applicationService.request('findById', { id: applicationId, fields: ['name', 'organizationId'] });
  if (!app) throw createError(404, 'No application found for the provided ID.');
  const [org, customFieldConnection] = await Promise.all([
    organizationService.request('findById', { id: app.organizationId, fields: ['name', 'regionalConsentPolicies'] }),
    applicationService.request('field.listForApp', {
      id: applicationId,
      fields: {
        name: 1,
        label: 1,
        active: 1,
        multiple: 1,
        options: 1,
      },
      pagination: { limit: 0, sort: { field: 'name', order: 1 } },
    }),
  ]);
  const customSelectFields = customFieldConnection.edges.map(edge => edge.node);

  try {
    const contents = await new Promise((resolve, reject) => {
      let csv = '';
      const parser = new AsyncParser();
      parser.processor
        // eslint-disable-next-line no-return-assign
        .on('data', chunk => csv += chunk.toString())
        .on('error', reject)
        .on('end', () => resolve(csv));
      streamResults({
        client: applicationService,
        action: 'user.listForApp',
        fields,
        regionalConsentPolicies: getAsArray(org, 'regionalConsentPolicies'),
        customSelectFields,
        params: {
          id: applicationId,
          sort: { field: 'createdAt', order: 'desc' },
        },
        stream: parser.input,
      });
    });

    const filename = `app-user-export-${applicationId}-${Date.now()}.csv`;
    await upload({ filename, contents });

    const url = `https://${AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${filename}`;
    await sendSuccess({ email, url });
    return 'ok';
  } catch (e) {
    newrelic.noticeError(e);
    sendFailure({ email, error: e }).catch(newrelic.noticeError);
    return 'failure';
  }
};
