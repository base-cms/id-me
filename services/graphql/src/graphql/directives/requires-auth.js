const { SchemaDirectiveVisitor } = require('graphql-tools');

class RequiresAuthDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    const { resolve } = field;
    const { type } = this.args;

    // eslint-disable-next-line no-param-reassign
    field.resolve = async (...args) => {
      const [, , { user }] = args;
      user.check(type);

      if (typeof resolve === 'function') return resolve(...args);
      return null;
    };
  }
}

module.exports = RequiresAuthDirective;
