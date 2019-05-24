const {
  cleanEnv,
  validators,
  port,
} = require('@base-cms/env');

const { nonemptystr } = validators;

module.exports = cleanEnv(process.env, {
  MONGO_DSN: nonemptystr({ desc: 'The MongoDB DSN to connect to.' }),
  INTERNAL_PORT: port({ desc: 'The internal port that express will run on.', default: 80 }),
  EXTERNAL_PORT: port({ desc: 'The external port that express is exposed on.', default: 80 }),
});
