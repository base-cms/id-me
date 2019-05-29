const orgService = require('@base-cms/id-me-organization-client');
const { UserInputError } = require('apollo-server-express');
const { get } = require('object-path');

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
    if (!this.exists()) throw new UserInputError('No organization ID was provided with this request.');
    return true;
  }
}

module.exports = async (id) => {
  const context = new OrgContext(id);
  await context.load();
  return context;
};
