import Component from '@ember/component';
import { computed } from '@ember/object'

export default Component.extend({
  label: null, // required
  icon: null, // required

  confirmLabel: 'Click to confirm',
  loadingLabel: 'Saving...',

  isLoading: false,
  disabled: false,

  mustConfirm: false,
  confirmTimeout: 2500,

  showIcons: true,
  showLabel: true,

  stopPropagation: true,

  // private data
  promptConfirm: false,

  isDisabled: computed('disabled', 'isLoading', function() {
    if (this.isLoading) return true;
    return this.disabled;
  }),

  isConfirming: computed('mustConfirm', 'promptConfirm', function() {
    return this.mustConfirm && this.promptConfirm;
  }),

  currentLabel: computed('isLoading', 'loadingLabel', 'promptConfirm', 'confirmLabel', 'label', function() {
    if (this.isLoading) return this.loadingLabel;
    if (this.promptConfirm) return this.confirmLabel;
    return this.label;
  }),

  currentIcon: computed('icon', 'isLoading', 'isConfirming', function() {
    if (this.isLoading) return 'hour-glass';
    if (this.isConfirming) return 'warning';
    return this.icon;
  }),

  click(event) {
    event.preventDefault();
    if (this.stopPropagation) event.stopPropagation();
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
