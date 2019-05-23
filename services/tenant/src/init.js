const connection = require('./mongodb/connection');
const models = require('./mongodb/models');

const { log } = console;

const start = (promise, name, url) => {
  log(`> Connecting to ${name}...`);
  return promise.then((r) => {
    const u = typeof url === 'function' ? url(r) : url;
    log(`> ${name} connected ${u ? `(${u})` : ''}`);
    return r;
  });
};

const indexModel = Model => new Promise((resolve, reject) => {
  Model.on('index', (err) => {
    if (err) { reject(err); } else { resolve(); }
  });
});

const indexModels = () => Promise.all(Object.keys(models).map(name => indexModel(models[name])));

module.exports = () => Promise.all([
  start(connection, 'MongoDB', m => m.client.s.url),
  indexModels().then(() => log('> Model indexes created.')),
]);
