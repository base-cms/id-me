import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  banned: false,
  isLoading: false,

  label: computed('banned', function() {
    if (this.banned) return 'Unban';
    return 'Ban';
  }),

  type: 'secondary',
});
