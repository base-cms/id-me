import Component from '@ember/component';
import { computed } from '@ember/object'

export default Component.extend({
  tagName: 'button',
  attributeBindings: [
    'disabled',
    'buttonType:type',
    'buttonLabel:title',
  ],
  classNameBindings: ['classes'],

  label: null, // required
  icon: null, // required

  type: 'primary',
  outline: false,
  block: false,
  size: null,
  buttonClass: null,

  confirmLabel: 'Click to confirm',
  loadingLabel: 'Saving...',

  disabled: false,
  buttonType: 'button',

  isLoading: false,

  mustConfirm: false,
  confirmTimeout: 2500,

  showIcons: true,
  showLabel: true,

  // private data
  promptConfirm: false,

  isConfirming: computed('mustConfirm', 'promptConfirm', function() {
    return this.mustConfirm && this.promptConfirm;
  }),

  buttonLabel: computed('isLoading', 'loadingLabel', 'promptConfirm', 'confirmLabel', 'label', function() {
    if (this.isLoading) return this.loadingLabel;
    if (this.promptConfirm) return this.confirmLabel;
    return this.label;
  }),

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

  click(event) {
    event.preventDefault();
    if (this.timeout) clearTimeout(this.timeout);
    if (this.mustConfirm) {
      if (!this.promptConfirm) {
        this.set('promptConfirm', true);
        const timeout = setTimeout(() => {
          this.set('promptConfirm', false);
          this.element.blur();
        }, this.confirmTimeout);
        this.set('timeout', timeout);
      } else {
        this.onClick(event);
        this.set('promptConfirm', false);
      }
    } else {
      this.onClick(event);
    }
  },

  keyUp(event) {
    if (event.key === 'Escape') this.element.blur();
  },

  focusOut() {
    this.set('promptConfirm', false);
  },
});
