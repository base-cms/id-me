const {
  cleanEnv,
  validators,
} = require('@base-cms/env');

const { nonemptystr } = validators;

const services = [
  'application',
  'locale',
  'mailer',
  'membership',
  'organization',
  'token',
  'user',
];

module.exports = cleanEnv(process.env, services.reduce((o, name) => {
  const prop = `${name.toUpperCase()}_SERVICE_URL`;
  const validator = nonemptystr({ desc: `The ID|Me ${name} service URL to connect to.` });
  return { ...o, [prop]: validator };
}, {}));
