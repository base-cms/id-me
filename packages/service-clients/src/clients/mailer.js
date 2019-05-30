const { client } = require('@base-cms/micro');
const { MAILER_SERVICE_URL } = require('../env');

module.exports = client.json({ url: MAILER_SERVICE_URL });
