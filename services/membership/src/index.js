require('./newrelic');
const { service } = require('@base-cms/micro');
const newrelic = require('./newrelic');
const { INTERNAL_PORT, EXTERNAL_PORT } = require('./env');
const pkg = require('../package.json');
const actions = require('./actions');
const init = require('./init');
const ping = require('./ping');

const { log } = console;

process.on('unhandledRejection', (e) => {
  newrelic.noticeError(e);
  throw e;
});

service.jsonServer({
  actions,
  onStart: async () => {
    log(`> Booting ${pkg.name} v${pkg.version}...`);
    await init();
  },
  onHealthCheck: ping,
  onError: newrelic.noticeError,
  port: INTERNAL_PORT,
  exposedPort: EXTERNAL_PORT,
}).catch(e => setImmediate(() => {
  newrelic.noticeError(e);
  throw e;
}));
