const {
  cleanEnv,
  validators,
} = require('@base-cms/env');

const { nonemptystr } = validators;

module.exports = cleanEnv(process.env, {
  MAILER_SERVICE_URL: nonemptystr({ desc: 'The ID|Me mailer service URL to connect to.' }),
});
