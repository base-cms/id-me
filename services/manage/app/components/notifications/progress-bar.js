import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['progress-bar', 'progress-bar-striped', 'progress-bar-animated'],
  classNameBindings: ['background'],
  attributeBindings: ['role', 'style'],

  type: 'primary',
  role: 'progressbar',

  background: computed('type', function() {
    return `bg-${this.type.toLowerCase()}`;
  }),

  style: computed(function() {
    return this.get('duration');
  }),
});
