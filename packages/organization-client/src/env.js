const {
  cleanEnv,
  validators,
} = require('@base-cms/env');

const { nonemptystr } = validators;

module.exports = cleanEnv(process.env, {
  ORGANIZATION_SERVICE_URL: nonemptystr({ desc: 'The ID|Me organization service URL to connect to.' }),
});
