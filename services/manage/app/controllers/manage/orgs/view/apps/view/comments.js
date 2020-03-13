import Controller from '@ember/controller';
import { computed } from '@ember/object';
import moment from 'moment';

export default Controller.extend({
  center: moment(),

  hasFilters: computed.or('statuses.length', 'users.length', 'streams.length', 'starting', 'ending'),
  filtersNotSelected: computed.not('hasFilters'),

  formattedRange: computed('starting', 'ending', function() {
    const { starting, ending } = this;
    return {
      start: typeof starting === 'string' ? moment(parseInt(starting, 10)) : starting,
      end: typeof ending === 'string' ? moment(parseInt(ending, 10)) : ending,
    }
  }),

  starting: null,
  ending: null,

  init() {
    this._super(...arguments);
    this.set('queryParams', ['statuses', 'users', 'streams', 'starting', 'ending']);
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
    setRange(range) {
      this.set('starting', range.start);
      this.set('ending', range.end);
    },
    clearFilters() {
      this.set('statuses', []);
      this.set('users', []);
      this.set('streams', []);
      this.set('starting', null);
      this.set('ending', null);
    },
  },
});
