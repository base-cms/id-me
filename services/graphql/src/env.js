const {
  cleanEnv,
  validators,
  port,
  bool,
} = require('@base-cms/env');

const { nonemptystr } = validators;

module.exports = cleanEnv(process.env, {
  EXTERNAL_PORT: port({ desc: 'The external port that express is exposed on.', default: 80 }),
  INTERNAL_PORT: port({ desc: 'The internal port that express will run on.', default: 80 }),
  MONGO_DSN: nonemptystr({ desc: 'The MongoDB DSN to connect to.' }),
  NEW_RELIC_ENABLED: bool({ desc: 'Whether New Relic is enabled.', default: true, devDefault: false }),
  NEW_RELIC_LICENSE_KEY: nonemptystr({ desc: 'The license key for New Relic.', devDefault: '(unset)' }),
});
