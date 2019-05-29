/* eslint-disable class-methods-use-this */
const { SchemaDirectiveVisitor } = require('graphql-tools');

class RequiresAuthDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    const { resolve } = field;

    // eslint-disable-next-line no-param-reassign
    field.resolve = async (...args) => {
      const [, , { user }] = args;
      user.check();

      if (typeof resolve === 'function') return resolve(...args);
      return null;
    };
  }
}

module.exports = RequiresAuthDirective;
