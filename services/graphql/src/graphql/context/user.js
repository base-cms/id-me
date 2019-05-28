const userService = require('@base-cms/id-me-user-client');
const { UserInputError, AuthenticationError } = require('apollo-server-express');
const { get } = require('object-path');

class UserContext {
  constructor(authorization) {
    this.authorization = authorization;
    this.user = {};
    this.token = {};
  }

  async load() {
    const { authorization } = this;
    if (authorization) {
      try {
        const token = authorization.replace('Bearer ', '');
        const { token: decoded, user } = token ? await userService.request('verifyAuth', { token }) : {};
        this.token = decoded;
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
    return get(this.token, 'jti');
  }

  getId() {
    return this.get('_id');
  }

  get(path, def) {
    return get(this.user, path, def);
  }

  exists() {
    if (this.errored()) return false;
    if (this.user) return true;
    return false;
  }

  check() {
    if (this.errored()) throw new AuthenticationError(this.error.message);
    if (!this.exists()) throw new UserInputError('No user authorization was provided with this request.');
    return true;
  }
}


module.exports = async (authorization) => {
  const context = new UserContext(authorization);
  await context.load();
  return context;
};
