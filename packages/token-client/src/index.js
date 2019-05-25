const { client } = require('@base-cms/micro');
const { TOKEN_SERVICE_URL } = require('./env');

module.exports = client.json({ url: TOKEN_SERVICE_URL });
