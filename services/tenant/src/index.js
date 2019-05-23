const { service } = require('@base-cms/micro');
const actions = require('./actions');

module.exports = service.json({
  actions,
});
