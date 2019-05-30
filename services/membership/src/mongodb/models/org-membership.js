const connection = require('../connection');
const schema = require('../schema/org-membership');

module.exports = connection.model('org-membership', schema);
