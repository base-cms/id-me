import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({


  hasFilters: computed.or('statuses.length', 'users.length', 'streams.length'),
  filtersNotSelected: computed.not('hasFilters'),

  init() {
    this._super(...arguments);
    this.set('queryParams', ['statuses', 'users', 'streams']);
    this.set('statuses', []);
    this.set('users', []);
    this.set('streams', []);
  },

  actions: {
    setStatuses(statuses) {
      this.set('statuses', statuses);
    },
    setUsers(users) {
      this.set('users', users);
    },
    setStreams(streams) {
      this.set('streams', streams);
    },
    clearFilters() {
      this.set('statuses', []);
      this.set('users', []);
      this.set('streams', []);
    },
  },
});
