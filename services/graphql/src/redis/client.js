const redis = require('redis');
const { promisify } = require('es6-promisify');

module.exports = (options) => {
  const instance = redis.createClient(options);
  return promisify(instance.send_command.bind(instance));
};
