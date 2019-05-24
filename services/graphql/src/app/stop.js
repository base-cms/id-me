const mongodb = require('../mongodb/connection');

const { log } = console;

const stop = (promise, name) => {
  log(`> Disconnecting from ${name}...`);
  return promise.then((r) => {
    log(`> ${name} disconnected`);
    return r;
  });
};

module.exports = () => Promise.all([
  stop(mongodb.close(), 'MongoDB'),
]);
