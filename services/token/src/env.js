const {
  cleanEnv,
  validators,
} = require('@base-cms/env');

const { nonemptystr } = validators;

module.exports = cleanEnv(process.env, {
  TOKEN_SECRET: nonemptystr({ desc: 'The token signing secret.' }),
});
