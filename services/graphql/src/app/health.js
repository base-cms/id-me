const { HealthCheckError } = require('@godaddy/terminus');

const { log } = console;

// eslint-disable-next-line no-unused-vars
const ping = (promise, name) => promise.then(() => `${name} pinged successfully.`);

module.exports = () => {
  const errors = [];
  return Promise.all([

  ].map(p => p.catch((err) => {
    errors.push(err);
  }))).then((res) => {
    if (errors.length) {
      log(errors);
      throw new HealthCheckError('Unhealthy', errors.map(e => e.message));
    }
    return res;
  });
};
