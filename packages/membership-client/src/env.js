const {
  cleanEnv,
  validators,
} = require('@base-cms/env');

const { nonemptystr } = validators;

module.exports = cleanEnv(process.env, {
  MEMBERSHIP_SERVICE_URL: nonemptystr({ desc: 'The ID|Me organization membership service URL to connect to.' }),
});
