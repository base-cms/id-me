const connection = require('../connection');
const schema = require('../schema/org-invitation');

module.exports = connection.model('org-invitation', schema);
