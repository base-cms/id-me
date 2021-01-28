import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  options: computed('field.options.[]', function() {
    return this.get('field.options').map((option) => option.label);
  }),
});
