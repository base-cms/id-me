import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  archived: false,
  isLoading: false,

  label: computed('archived', function() {
    if (this.archived) return 'Unarchive';
    return 'Archive';
  }),

  type: 'secondary',
});
