const {
  cleanEnv,
  validators,
} = require('@base-cms/env');

const { nonemptystr } = validators;

module.exports = cleanEnv(process.env, {
  USER_SERVICE_URL: nonemptystr({ desc: 'The ID|Me user service URL to connect to.' }),
});
