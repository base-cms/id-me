require('./newrelic');
const { service } = require('@base-cms/micro');
const actions = require('./actions');

process.on('unhandledRejection', (e) => { throw e; });

module.exports = service.json({
  actions,
});
