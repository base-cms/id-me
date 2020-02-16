const {
  cleanEnv,
  validators,
  bool,
  port,
} = require('@base-cms/env');

const { nonemptystr } = validators;

module.exports = cleanEnv(process.env, {
  EXTERNAL_PORT: port({ desc: 'The external port that the service is exposed on.', default: 80 }),
  INTERNAL_PORT: port({ desc: 'The internal port that the service will run on.', default: 80 }),
  MONGO_DSN: nonemptystr({ desc: 'The MongoDB DSN to connect to.' }),
  APPLICATION_URL: nonemptystr({ desc: 'The URI of the management app', default: 'https://identity-x.base-cms.io' }),
  NEW_RELIC_ENABLED: bool({ desc: 'Whether New Relic is enabled.', default: true, devDefault: false }),
  NEW_RELIC_LICENSE_KEY: nonemptystr({ desc: 'The license key for New Relic.', devDefault: '(unset)' }),
  SENDING_DOMAIN: nonemptystr({ desc: 'The domain emails will be sent from.', default: 'identity-x.base-cms.io' }),
});
