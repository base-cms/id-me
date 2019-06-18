import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  label: '',
  expanded: false,

  expandedClass: computed('expanded', function() {
    if (this.expanded) return 'expanded';
    return null;
  }),

  init() {
    this._super(...arguments);
    if (!Array.isArray(this.values)) {
      this.set('values', []);
    }
  },

  actions: {
    toggle() {
      this.toggleProperty('expanded');
    },
  },
});
