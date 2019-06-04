const { SchemaDirectiveVisitor } = require('graphql-tools');
const { ApolloError } = require('apollo-server-express');

class RequiresAppRoleDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    const { resolve } = field;
    const { roles } = this.args;

    // eslint-disable-next-line no-param-reassign
    field.resolve = async (...args) => {
      const [, , { app, user }] = args;
      app.check();
      user.check('OrgUser');

      const hasRole = await user.hasOrgRole(app.getOrgId(), roles);
      if (!hasRole) {
        throw new ApolloError('You do not have permission to access this resource.', 'UNAUTHORIZED');
      }

      if (typeof resolve === 'function') return resolve(...args);
      return null;
    };
  }
}

module.exports = RequiresAppRoleDirective;
