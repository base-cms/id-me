const orgService = require('@base-cms/id-me-organization-client');
const { UserInputError } = require('apollo-server-express');
const { get } = require('object-path');

module.exports = async (id, fields) => {
  const org = id ? await orgService.request('findById', { id, fields }) : null;

  const prototype = {
    getId() {
      return this.get('_id');
    },

    get(path, def) {
      return get(org, path, def);
    },

    exists() {
      if (org) return true;
      return false;
    },

    check() {
      if (!this.exists()) throw new UserInputError('No organization ID was provided with the request.');
      return true;
    },
  };

  return Object.create(prototype);
};
