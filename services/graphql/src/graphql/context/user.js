const userService = require('@base-cms/id-me-user-client');
const { UserInputError, AuthenticationError } = require('apollo-server-express');
const { get } = require('object-path');

class UserContext {
  constructor(authorization) {
    this.authorization = authorization;
    this.user = {};
    this.decoded = {};
  }

  async load() {
    const { authorization } = this;
    if (authorization) {
      try {
        const token = authorization.replace('Bearer ', '');
        const { token: decoded, user } = token ? await userService.request('verifyAuth', { token }) : {};
        this.token = token;
        this.decoded = decoded;
        this.user = user;
      } catch (e) {
        this.error = e;
      }
    }
  }

  errored() {
    if (this.error) return true;
    return false;
  }

  getTokenId() {
    return get(this.decoded, 'jti');
  }

  getId() {
    return this.get('_id');
  }

  get(path, def) {
    return get(this.user, path, def);
  }

  exists() {
    if (this.errored()) return false;
    if (this.getId()) return true;
    return false;
  }

  hasOrgRole(organizationId, roles) {
    return userService.request('hasOrgRole', { email: this.get('email'), organizationId, roles });
  }

  check() {
    if (this.errored()) throw new AuthenticationError(this.error.message);
    if (!this.exists()) throw new UserInputError('No user authetication was provided with this request.');
    return true;
  }
}


module.exports = async (authorization) => {
  const context = new UserContext(authorization);
  await context.load();
  return context;
};
