const { UserInputError } = require('apollo-server-express');
const { get } = require('object-path');
const { applicationService } = require('@base-cms/id-me-service-clients');

class AppContext {
  constructor(id) {
    this.id = id;
    this.app = {};
  }

  async load() {
    const { id } = this;
    if (id) {
      try {
        this.app = await applicationService.request('findById', { id }) || {};
      } catch (e) {
        this.error = e;
      }
    }
  }

  errored() {
    if (this.error) return true;
    return false;
  }

  getId() {
    return this.get('_id');
  }

  getOrgId() {
    return this.get('organizationId');
  }

  get(path, def) {
    return get(this.app, path, def);
  }

  exists() {
    if (this.errored()) return false;
    if (this.getId() && this.getOrgId()) return true;
    return false;
  }

  check() {
    if (this.errored()) throw this.error;
    if (!this.exists()) throw new UserInputError('Unable to find an application for this request.');
    return true;
  }
}

module.exports = async (id) => {
  const context = new AppContext(id);
  await context.load();
  return context;
};
