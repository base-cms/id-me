const isDuplicateKeyError = require('./is-duplicate-key-error');
const isValidationError = require('./is-validation-error');

module.exports = (createError, e, statusCode = 422) => {
  if (isValidationError(e)) {
    const fields = e.errors && typeof e.errors === 'object' ? e.errors : {};
    const messages = Object.keys(fields).map(name => fields[name]);
    const error = createError(422, `${messages.join('\n')}`, e);
    error.isValidationError = true;
    return error;
  }
  if (isDuplicateKeyError(e)) return createError(statusCode, e.message, e);
  return e;
};
