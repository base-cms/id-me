const {
  cleanEnv,
  validators,
  bool,
} = require('@base-cms/env');

const { nonemptystr } = validators;

module.exports = cleanEnv(process.env, {
  AWS_ACCESS_KEY_ID: nonemptystr({ desc: 'The AWS Access Key ID.', devDefault: '(unset)' }),
  AWS_S3_BUCKET_NAME: nonemptystr({ desc: 'The AWS S3 Bucket to store exports in.', devDefault: 'us-east-1-identity-x-exports' }),
  AWS_SECRET_ACCESS_KEY: nonemptystr({ desc: 'The AWS Secret Access Key', devDefault: '(unset)' }),
  NEW_RELIC_ENABLED: bool({ desc: 'Whether New Relic is enabled.', default: true, devDefault: false }),
  NEW_RELIC_LICENSE_KEY: nonemptystr({ desc: 'The license key for New Relic.', devDefault: '(unset)' }),
  SENDING_DOMAIN: nonemptystr({ desc: 'The domain emails will be sent from.', default: 'identity-x.base-cms.io' }),
});
