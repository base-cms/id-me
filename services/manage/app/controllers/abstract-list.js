import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  /**
   * Query params
   */
  queryParams: null,

  /**
   * Pagination
   */
  limit: 24,

  /**
   * Search
   */
  phrase: '',
  position: 'contains',
  field: 'name',

  /**
   * Sort
   */
  sortField: 'id',
  sortDirection: 'desc',

  isSortDisabled: computed('phrase.length', function() {
    return this.get('phrase.length') > 0;
  }),

  init() {
    this._super(...arguments);
    this.set('queryParams', ['sortField', 'sortDirection', 'phrase', 'position', 'field']);

    // Should be overriden by the specific controller for different options.
    this.set('searchFields', []);
    this.set('sortOptions', [
      { key: 'updatedAt', label: 'Updated' },
    ]);
    this.set('sortField', 'updatedAt');
  },

  actions: {
    search(phrase) {
      this.set('phrase', phrase);
    },
  },
});
