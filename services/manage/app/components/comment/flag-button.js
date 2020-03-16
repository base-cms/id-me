import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  flagged: true,
  banned: false,
  isLoading: false,

  label: computed('flagged', function() {
    if (this.flagged) return 'Unflag';
    return 'Flag';
  }),

  type: 'secondary',
});
