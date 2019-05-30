const { client } = require('@base-cms/micro');
const { USER_SERVICE_URL } = require('../env');

module.exports = client.json({ url: USER_SERVICE_URL });
