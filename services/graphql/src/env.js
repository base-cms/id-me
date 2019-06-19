const {
  cleanEnv,
  validators,
  port,
  bool,
  str,
} = require('@base-cms/env');

const { nonemptystr } = validators;

module.exports = cleanEnv(process.env, {
  ENGINE_API_KEY: nonemptystr({ desc: 'The Apollo Engine API key', devDefault: '(unset)' }),
  EXTERNAL_PORT: port({ desc: 'The external port that express is exposed on.', default: 80 }),
  INTERNAL_PORT: port({ desc: 'The internal port that express will run on.', default: 80 }),
  MONGO_DSN: nonemptystr({ desc: 'The MongoDB DSN to connect to.' }),
  NEW_RELIC_ENABLED: bool({ desc: 'Whether New Relic is enabled.', default: true, devDefault: false }),
  NEW_RELIC_LICENSE_KEY: nonemptystr({ desc: 'The license key for New Relic.', devDefault: '(unset)' }),
  TRUSTED_PROXIES: str({ desc: 'A comma seperated list of trusted proxy IP addresses.' }),
});
