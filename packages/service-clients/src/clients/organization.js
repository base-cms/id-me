const { client } = require('@base-cms/micro');
const { ORGANIZATION_SERVICE_URL } = require('../env');

module.exports = client.json({ url: ORGANIZATION_SERVICE_URL });
