import ActionElement from '@identity-x/manage/components/action-element';
import { computed } from '@ember/object'

export default ActionElement.extend({
  tagName: 'button',
  attributeBindings: [
    'disabled',
    'buttonType:type',
    'buttonLabel:title',
  ],
  classNameBindings: ['classes'],

  type: 'primary',
  outline: false,
  block: false,
  size: null,
  buttonClass: null,

  disabled: false,
  buttonType: 'button',

  classes: computed('type', 'outline', 'size', 'block', 'buttonClass', function() {
    const classes = ['btn'];
    if (this.size === 'lg') classes.push('btn-lg');
    if (this.size === 'sm') classes.push('btn-sm');
    if (this.block) classes.push('btn-block');
    if (this.outline) {
      classes.push(`btn-outline-${this.type}`);
    } else {
      classes.push(`btn-${this.type}`);
    }
    if (this.buttonClass) classes.push(this.buttonClass);
    return classes.join(' ');
  }),
});
