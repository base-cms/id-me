const AccessLevel = require('../../mongodb/models/access-level');

module.exports = ({ query, fields }) => AccessLevel.find(query, fields);
