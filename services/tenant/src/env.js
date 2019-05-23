const {
  cleanEnv,
  validators,
} = require('@base-cms/env');

const { nonemptystr } = validators;

module.exports = cleanEnv(process.env, {
  CORE_DSN: nonemptystr({ desc: 'The MongoDB core DSN to connect to.' }),
});
