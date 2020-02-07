import Component from '@ember/component';
import { computed } from '@ember/object';

const getValue = v => (v == null ? '' : v);

export default Component.extend({
  tagName: 'option',
  attributeBindings: ['isSelected:selected', 'value'],

  /**
   * The option value.
   */
  value: '',

  /**
   * The currently selected option value.
   * Must be passed in.
   */
  selected: '',

  /**
   * Determines if the `selected` value matches the `value`.
   * Will set the options `selected` attribute if true.
   */
  isSelected: computed('value', 'selected', function() {
    const value = getValue(this.value);
    const selected = getValue(this.selected);
    return value === selected;
  }),
});
