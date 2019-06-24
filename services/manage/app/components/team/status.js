import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'div',
  classNames: ['text-muted', 'small'],

  value: false,

  label: computed('value', function() {
    return this.get('value') ? 'Active' : 'Inactive';
  }),
  labelClass: computed('value', function() {
    return this.get('value') ? 'text-success' : 'text-muted';
  }),
});
