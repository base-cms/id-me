import Component from '@ember/component';
import { computed } from '@ember/object';

const { isArray } = Array;

export default Component.extend({
  label: null,
  name: null,
  multiple: false,
  disabled: false,

  /**
   * Convert the selected value to the format power select expects:
   * - an array when multiple
   * - a single value when not
   */
  selected: computed('multiple', 'answers.[]', function() {
    if (this.multiple) return this.answers;
    return this.answers[0];
  }),

  /**
   * Use the selected answer as the option (when found) to ensure
   * selection highlighting is applied.
   */
  formattedOptions: computed('options.[]', 'answers.[]', function() {
    return this.options.map((option) => {
      const answer = this.answers.find((answer) => answer.id === option.id);
      return answer || option;
    });
  }),

  init() {
    this._super(...arguments);
    // since custom field answers are always treated as an array,
    // ensure answers is always an array.
    if (!isArray(this.answers)) this.set('answers', []);
    // ensure options are an array.
    if (!isArray(this.options)) this.set('options', []);
  },

  actions: {
    handleChange(value) {
      const values = (isArray(value) ? value : [value]).filter((v) => v);
      this.set('answers', values);
    },
  },
});
