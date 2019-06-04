const { UserInputError, AuthenticationError } = require('apollo-server-express');
const { get } = require('object-path');
const { membershipService, userService, applicationService } = require('@base-cms/id-me-service-clients');

const allowedTypes = ['OrgUser', 'AppUser'];

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
        const [type, token] = authorization.split(' ');
        if (!allowedTypes.includes(type)) throw new Error(`Invalid authorization type. Allowed types are ${allowedTypes.join(' ')}`);
        this.type = type;
        this.token = token;

        if (type === 'OrgUser') {
          await this.loadForOrg(token);
        } else {
          await this.loadForApp(token);
        }
      } catch (e) {
        this.error = e;
      }
    }
  }

  async loadForOrg(token) {
    const { token: decoded, user } = await userService.request('verifyAuth', { token });
    this.decoded = decoded;
    this.user = user;
  }

  async loadForApp(token) {
    const { token: decoded, user } = await applicationService.request('user.verifyAuth', { token });
    this.decoded = decoded;
    this.user = user;
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

  getAppId() {
    if (this.type !== 'AppUser') return undefined;
    return get(this.decoded, 'iss');
  }

  hasAppId() {
    const id = this.getAppId();
    if (id) return true;
    return false;
  }

  hasOrgRole(organizationId, roles) {
    if (this.type !== 'OrgUser') return false;
    return membershipService.request('hasRole', { email: this.get('email'), organizationId, roles });
  }

  check(type) {
    if (this.errored()) throw new AuthenticationError(this.error.message);
    if (!this.exists()) throw new UserInputError('No user authentication was provided with this request.');
    if (type !== this.type) throw new AuthenticationError('The wrong user authorization type was provided.');
    if (this.type === 'AppUser' && !this.hasAppId()) throw new Error('No user associated application ID was found');
    return true;
  }
}


module.exports = async (authorization) => {
  const context = new UserContext(authorization);
  await context.load();
  return context;
};
