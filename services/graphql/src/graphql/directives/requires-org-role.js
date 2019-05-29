const { SchemaDirectiveVisitor } = require('graphql-tools');
const { ApolloError } = require('apollo-server-express');

class RequiresOrgRoleDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    const { resolve } = field;
    const { roles } = this.args;

    // eslint-disable-next-line no-param-reassign
    field.resolve = async (...args) => {
      const [, , { org, user }] = args;
      org.check();
      user.check();

      const hasRole = await user.hasOrgRole(org.getId(), roles);
      if (!hasRole) {
        throw new ApolloError('You do not have permission to access this resource.', 'UNAUTHORIZED');
      }

      if (typeof resolve === 'function') return resolve(...args);
      return null;
    };
  }
}

module.exports = RequiresOrgRoleDirective;
