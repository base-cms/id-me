const {
  cleanEnv,
  validators,
  bool,
  port,
} = require('@base-cms/env');

const { nonemptystr } = validators;

module.exports = cleanEnv(process.env, {
  AWS_ACCESS_KEY_ID: nonemptystr({ desc: 'The AWS Access Key ID.', devDefault: '(unset)' }),
  AWS_S3_BUCKET_NAME: nonemptystr({ desc: 'The AWS S3 Bucket to store exports in.', devDefault: 'us-east-1-identity-x-exports' }),
  AWS_SECRET_ACCESS_KEY: nonemptystr({ desc: 'The AWS Secret Access Key', devDefault: '(unset)' }),
  EXTERNAL_PORT: port({ desc: 'The external port that the service is exposed on.', default: 80 }),
  INTERNAL_PORT: port({ desc: 'The internal port that the service will run on.', default: 80 }),
  NEW_RELIC_ENABLED: bool({ desc: 'Whether New Relic is enabled.', default: true, devDefault: false }),
  NEW_RELIC_LICENSE_KEY: nonemptystr({ desc: 'The license key for New Relic.', devDefault: '(unset)' }),
  SENDING_DOMAIN: nonemptystr({ desc: 'The domain emails will be sent from.', default: 'identity-x.base-cms.io' }),
  SUPPORT_EMAIL: nonemptystr({ desc: 'The support email address.', default: 'base@endeavorb2b.com' }),
  SUPPORT_ENTITY: nonemptystr({ desc: 'The contact info for the supporting entity.', default: 'Endeavor Business Media, 1233 Janesville Ave, Fort Atkinson, WI 53551, 800-547-7377' }),
});
