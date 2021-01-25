const Field = require('./index');
const schema = require('../../schema/field/select');

module.exports = Field.discriminator('field-select', schema, 'select');
