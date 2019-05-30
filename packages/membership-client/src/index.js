const { client } = require('@base-cms/micro');
const { MEMBERSHIP_SERVICE_URL } = require('./env');

module.exports = client.json({ url: MEMBERSHIP_SERVICE_URL });
