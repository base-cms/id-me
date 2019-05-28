const { Schema } = require('mongoose');

const getDefinition = ({
  type,
  options,
}) => ({
  ...options,
  type: type || Schema.Types.ObjectId,
});

module.exports = function referencePlugin(schema, {
  name,
  type,
  many = false,
  options = {},
} = {}) {
  const definition = getDefinition({
    type,
    options,
  });
  if (many) {
    schema.add({ [name]: [definition] });
  } else {
    schema.add({ [name]: definition });
  }
};
