const {
  cleanEnv,
  validators,
} = require('@base-cms/env');

const { nonemptystr } = validators;

module.exports = cleanEnv(process.env, {
  MONGO_DSN: nonemptystr({ desc: 'The MongoDB DSN to connect to.' }),
});
