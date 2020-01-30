const { service } = require('@base-cms/micro');
const { parse } = require('json2csv');
const newrelic = require('../../newrelic');
const { AppUser } = require('../../mongodb/models');
const { sendFailure, sendSuccess } = require('../../utils');
const { upload } = require('../../s3');
const { AWS_S3_BUCKET_NAME } = require('../../env');

const { createRequiredParamError } = service;

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

module.exports = async ({
  email,
  applicationId,
} = {}) => {
  if (!email) throw createRequiredParamError('email');
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!Array.isArray(fields)) throw createRequiredParamError('fields');
  const projection = fields.reduce((obj, k) => ({ ...obj, [k]: 1 }), {});

  try {
    const users = await AppUser.find({ applicationId }, projection).limit(10);
    const contents = await parse(users, { fields });
    const filename = `export-${applicationId}-${Date.now()}.csv`;
    await upload({ filename, contents });

    const url = `https://${AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${filename}`;
    await sendSuccess({ email, url });
    return 'ok';
  } catch (e) {
    newrelic.noticeError(e);
    await sendFailure({ email, error: e });
    return 'failure';
  }
};
