const { createError } = require('micro');
const isDuplicateKeyError = require('../mongodb/utils/is-duplicate-key-error');
const isValidationError = require('../mongodb/utils/is-validation-error');

module.exports = (e) => {
  if (isValidationError(e) || isDuplicateKeyError(e)) return createError(422, e.message);
  return e;
};
