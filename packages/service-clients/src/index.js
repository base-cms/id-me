const { client } = require('@base-cms/micro');
const env = require('./env');
const services = require('./services');
const createEnvVar = require('./create-env-var');

const onCreateError = ({
  json,
  res,
  createError,
}) => {
  const { message } = json;
  return createError(res.status, `${message}`);
};

module.exports = services.reduce((o, { key, name }) => {
  const varName = createEnvVar(key);
  const url = env[varName];
  return { ...o, [`${key}Service`]: client.json({ url, name, onCreateError }) };
}, {});
