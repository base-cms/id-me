const { service } = require('@base-cms/micro');
const { applicationService } = require('@identity-x/service-clients');
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

  try {
    const contents = await new Promise((resolve, reject) => {
      let csv = '';
      const parser = new AsyncParser({ fields });
      parser.processor
        // eslint-disable-next-line no-return-assign
        .on('data', chunk => csv += chunk.toString())
        .on('error', reject)
        .on('end', () => resolve(csv));
      streamResults({
        client: applicationService,
        action: 'user.listForApp',
        params: {
          id: applicationId,
          fields: fields.reduce((obj, k) => ({ ...obj, [k]: 1 }), {}),
          sort: { field: 'id', direction: 'desc' },
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
