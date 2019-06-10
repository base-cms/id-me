const { client } = require('@base-cms/micro');
const { LOCALE_SERVICE_URL } = require('../env');

module.exports = client.json({ url: LOCALE_SERVICE_URL });
