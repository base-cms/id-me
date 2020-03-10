import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['comment-status'],
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
    return 'Denied';
  }),

  modifier: computed('approved', 'banned', function() {
    if (this.approved) return 'comment-status--approved';
    if (this.banned) return 'comment-status--banned';
    return 'comment-status--denied';
  }),
});
