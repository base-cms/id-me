/* eslint-disable class-methods-use-this */
const { SchemaDirectiveVisitor } = require('graphql-tools');

class RequiresAppDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    const { resolve } = field;

    // eslint-disable-next-line no-param-reassign
    field.resolve = async (...args) => {
      const [, , { app }] = args;
      app.check();

      if (typeof resolve === 'function') return resolve(...args);
      return null;
    };
  }
}

module.exports = RequiresAppDirective;
