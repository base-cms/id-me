const { UserInputError } = require('apollo-server-express');
const { get } = require('object-path');
const { orgService } = require('@base-cms/id-me-service-clients');

class OrgContext {
  constructor(id) {
    this.id = id;
    this.org = {};
  }

  async load() {
    const { id } = this;
    if (id) {
      try {
        this.org = await orgService.request('findById', { id }) || {};
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

  get(path, def) {
    return get(this.org, path, def);
  }

  exists() {
    if (this.errored()) return false;
    if (this.getId()) return true;
    return false;
  }

  check() {
    if (this.errored()) throw this.error;
    if (!this.exists()) throw new UserInputError('Unable to find an organization for this request.');
    return true;
  }
}

module.exports = async (id) => {
  const context = new OrgContext(id);
  await context.load();
  return context;
};
