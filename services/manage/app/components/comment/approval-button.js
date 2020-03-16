import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  approved: true,
  banned: false,
  isLoading: false,

  label: computed('approved', function() {
    if (this.approved) return 'Reject';
    return 'Approve';
  }),

  icon: computed('approved', function() {
    if (this.approved) return 'cross';
    return 'check';
  }),

  type: computed('approved', function() {
    if (this.approved) return 'primary';
    return 'primary';
  }),
});
