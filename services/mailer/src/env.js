const {
  cleanEnv,
  validators,
} = require('@base-cms/env');

const { nonemptystr } = validators;

module.exports = cleanEnv(process.env, {
  SENDGRID_API_KEY: nonemptystr({ desc: 'The Sendgrid API key for sending email.' }),
});
