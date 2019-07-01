import Controller from '@ember/controller';

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
  sortField: 'updatedAt',
  sortOrder: 'desc',

  init() {
    this._super(...arguments);
    this.set('queryParams', ['sortField', 'sortOrder', 'phrase', 'position', 'field']);

    // Sets/resets default values.
    this.set('limit', 24);
    this.set('phrase', '');
    this.set('position', 'contains');
    this.set('field', 'name');

    this.set('sortOrder', 'desc');

    // Should be overriden by the specific controller for different options.
    this.set('searchFields', []);
    this.set('sortOptions', [
      { key: 'updatedAt', label: 'Updated' },
    ]);
    this.set('sortField', 'updatedAt');
  },

  actions: {
    reset() {
      this.init();
    },
    search(phrase) {
      this.set('phrase', phrase);
    },
  },
});
