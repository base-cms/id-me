const {
  cleanEnv,
  validators,
} = require('@base-cms/env');
const services = require('./services');
const createEnvVar = require('./create-env-var');

const { nonemptystr } = validators;

module.exports = cleanEnv(process.env, services.reduce((o, { key, name }) => {
  const varName = createEnvVar(key);
  const validator = nonemptystr({ desc: `The IdentityX ${name} service URL to connect to.`, default: `http://${key}` });
  return { ...o, [varName]: validator };
}, {}));
