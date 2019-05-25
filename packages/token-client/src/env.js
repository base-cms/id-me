const {
  cleanEnv,
  validators,
} = require('@base-cms/env');

const { nonemptystr } = validators;

module.exports = cleanEnv(process.env, {
  TOKEN_SERVICE_URL: nonemptystr({ desc: 'The ID|Me token service URL to connect to.' }),
});
