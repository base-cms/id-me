const roles = require('./org-roles');

module.exports = function orgRolePlugin(schema, options = {}) {
  schema.add({
    role: {
      ...options,
      type: String,
      required: true,
      default: 'Member',
      enum: roles,
    },
  });
};
