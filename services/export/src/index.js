require('./newrelic');
const { service } = require('@base-cms/micro');
const actions = require('./actions');
const init = require('./init');
const ping = require('./ping');

process.on('unhandledRejection', (e) => { throw e; });

module.exports = service.json({
  actions,
  init,
  ping,
});
