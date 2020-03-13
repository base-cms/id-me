import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({


  hasFilters: computed.or('statuses.length', 'users.length'),
  filtersNotSelected: computed.not('hasFilters'),

  init() {
    this._super(...arguments);
    this.set('queryParams', ['statuses', 'users']);
    this.set('statuses', []);
    this.set('users', []);
  },

  actions: {
    setStatuses(statuses) {
      this.set('statuses', statuses);
    },
    setUsers(users) {
      this.set('users', users);
    },
    clearFilters() {
      this.set('statuses', []);
      this.set('users', []);
    },
  },
});
