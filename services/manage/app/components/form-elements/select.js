import Component from '@ember/component';
import { computed } from '@ember/object';
import OnInsertMixin from './mixins/on-insert';
import ValidityMixin from './mixins/validity';

export default Component.extend(OnInsertMixin, ValidityMixin, {
  tagName: 'select',
  classNameBindings: ['validityClass'],
  attributeBindings: [
    'aria-describedby',
    'autocomplete',
    'autofocus',
    'disabled',
    'name',
    'required',
    'tabindex',
  ],

  required: false,
  disabled: false,

  /**
   * The selected value.
   */
  value: '',

  /**
   * The formatted value used by the input.
   * Is passed to the option elements.
   */
  selected: computed('value', function() {
    if (this.get('multiple') && !Array.isArray(this.value)) {
      return [];
    }
    return this.value;
  }),

  didInsertElement() {
    this._super(...arguments);
    if (this.get('autofocus')) {
      // Force autofocus since browsers handle the attribute differently on transition.
      this.$().focus();
    }
  },

  /**
   * Sets the internal value and fires the `on-change` event.
   *
   * @param {*} event
   */
  change(event) {
    const { target } = event;
    const { value } = target;
    const fn = this.get('on-change');
    if (typeof fn === 'function') {
      fn(value, event);
    }
  },
});
