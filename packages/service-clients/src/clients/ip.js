const { client } = require('@base-cms/micro');
const { IP_SERVICE_URL } = require('../env');

module.exports = client.json({ url: IP_SERVICE_URL });
