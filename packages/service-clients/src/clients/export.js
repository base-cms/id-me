const { client } = require('@base-cms/micro');
const { EXPORT_SERVICE_URL } = require('../env');

module.exports = client.json({ url: EXPORT_SERVICE_URL });
