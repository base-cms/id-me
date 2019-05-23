const {
  cleanEnv,
  validators,
  port,
} = require('@base-cms/env');

const { nonemptystr } = validators;

module.exports = cleanEnv(process.env, {
  TENANT_KEY: nonemptystr({ desc: 'The tenant key. Is used for querying the account information and settings from the core database connection.' }),
  TENANT_DSN: nonemptystr({ desc: 'The MongoDB tenant DSN to connect to.' }),
  CORE_DSN: nonemptystr({ desc: 'The MongoDB core DSN to connect to.' }),
  REDIS_DSN: nonemptystr({ desc: 'The Redis DSN to connect to.' }),
  INTERNAL_PORT: port({ desc: 'The internal port that express will run on.', default: 80 }),
  EXTERNAL_PORT: port({ desc: 'The external port that express is exposed on.', default: 80 }),
});
