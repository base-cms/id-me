const {
  cleanEnv,
  validators,
  bool,
} = require('@base-cms/env');

const { nonemptystr } = validators;

module.exports = cleanEnv(process.env, {
  MONGO_DSN: nonemptystr({ desc: 'The MongoDB DSN to connect to.' }),
  NEW_RELIC_ENABLED: bool({ desc: 'Whether New Relic is enabled.', default: true, devDefault: false }),
  NEW_RELIC_LICENSE_KEY: nonemptystr({ desc: 'The license key for New Relic.', devDefault: '(unset)' }),
  SENDING_DOMAIN: nonemptystr({ desc: 'The domain emails will be sent from.', default: 'identity-x.base-cms.io' }),
  SUPPORT_EMAIL: nonemptystr({ desc: 'The support email address.', default: 'base@endeavorb2b.com' }),
  SUPPORT_ENTITY: nonemptystr({ desc: 'The contact info for the supporting entity.', default: 'Endeavor Business Media, 1233 Janesville Ave, Fort Atkinson, WI 53551, 800-547-7377' }),
});
