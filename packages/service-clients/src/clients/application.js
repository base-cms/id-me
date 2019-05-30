const { client } = require('@base-cms/micro');
const { APPLICATION_SERVICE_URL } = require('../env');

module.exports = client.json({ url: APPLICATION_SERVICE_URL });
