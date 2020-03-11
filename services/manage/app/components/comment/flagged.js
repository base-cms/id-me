import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'h2',
  classNames: ['badge'],
  classNameBindings: ['modifier'],

  banned: false,

  modifier: computed('banned', function() {
    if (this.banned) return 'badge-secondary';
    return 'badge-danger';
  }),
});
