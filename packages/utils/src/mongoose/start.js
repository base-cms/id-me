const { isArray } = Array;
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

const indexModels = models => Promise
  .all(Object.keys(models).map(name => indexModel(models[name])));

module.exports = ({
  connection,
  models,
} = {}) => () => {
  const p = [];
  if (isArray(models)) p.push(indexModels(models).then(() => log('> Model indexes created.')));
  if (connection) p.push(start(connection, 'MongoDB', m => m.client.s.url));
  return Promise.all(p);
};
