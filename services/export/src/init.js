const { start } = require('@base-cms/id-me-utils').mongoose;
const connection = require('./mongodb/connection');
const models = require('./mongodb/models');
const s3 = require('./s3');

const mongodb = start({ connection, models });


module.exports = Promise.all([
  mongodb(),
  () => s3.client,
]);
