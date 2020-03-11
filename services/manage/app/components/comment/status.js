import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'h2',
  classNames: ['badge'],
  classNameBindings: ['modifier'],

  approved: true,
  banned: false,

  icon: computed('approved', function() {
    if (this.approved) return 'check';
    return 'cross';
  }),

  label: computed('approved', 'banned', function() {
    if (this.approved) return 'Approved';
    if (this.banned) return 'Banned';
    return 'Rejected';
  }),

  modifier: computed('approved', 'banned', function() {
    if (this.approved) return 'badge-success';
    if (this.banned) return 'badge-danger';
    return 'badge-warning';
  }),
});
