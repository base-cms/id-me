import ActionElement from '@identity-x/manage/components/action-element';
import { computed } from '@ember/object'

export default ActionElement.extend({
  tagName: 'a',
  attributeBindings: [
    'anchor:href',
  ],
  classNames: ['dropdown-item-with-icon'],

  name: null,

  anchor: computed('name', function() {
    if (this.name) return `#${this.name}`;
    return '#';
  }),
});
