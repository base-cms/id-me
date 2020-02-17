require('./newrelic');
const http = require('http');
const { createTerminus } = require('@godaddy/terminus');
const newrelic = require('./newrelic');
const app = require('./app');
const env = require('./env');
const ping = require('./ping');
const pkg = require('../package.json');
const start = require('./app/start');
const stop = require('./app/stop');

const {
  INTERNAL_PORT,
  EXTERNAL_PORT,
  TERMINUS_TIMEOUT,
  TERMINUS_SHUTDOWN_DELAY,
} = env;
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.json({ ping: 'pong' });
});

const wait = ms => new Promise(resolve => setTimeout(resolve, parseInt(ms, 10)));
const log = (message) => {
  const { log: emit } = console;
  emit(`> ${message}`);
};

const run = async () => {
  await start();

  createTerminus(server, {
    timeout: TERMINUS_TIMEOUT,
    signals: ['SIGTERM', 'SIGINT', 'SIGHUP', 'SIGQUIT'],
    healthChecks: { '/_health': () => ping() },
    onSignal: async () => {
      // Stop required services here...
      log('Signal received, running cleanup hook...');
      try {
        await stop();
      } catch (e) {
        newrelic.noticeError(e);
        log('CLEANUP ERRORS DETECTED!');
      } finally {
        log('Cleanup complete.');
      }
    },
    beforeShutdown: async () => {
      log('Running before shutdown hook...');
      try {
        if (TERMINUS_SHUTDOWN_DELAY) {
          log(`Delaying shutdown by ${TERMINUS_SHUTDOWN_DELAY}ms...`);
          await wait(TERMINUS_SHUTDOWN_DELAY);
        }
      } catch (e) {
        newrelic.noticeError(e);
        log('BEFORE SHUTDOWN ERRORS DETECTED!');
      } finally {
        log('Before shutdown complete.');
      }
    },
    onShutdown: () => log('Cleanup finished. Shutting down.'),
  });

  server.listen(INTERNAL_PORT, () => log(`Ready on http://0.0.0.0:${EXTERNAL_PORT}`));
};

process.on('unhandledRejection', (e) => {
  log('> Unhandled promise rejection. Throwing error...');
  newrelic.noticeError(e);
  throw e;
});

log(`> Booting ${pkg.name} v${pkg.version}...`);
run().catch(e => setImmediate(() => {
  newrelic.noticeError(e);
  throw e;
}));
