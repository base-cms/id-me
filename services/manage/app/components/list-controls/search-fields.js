import Component from '@ember/component';
import { computed } from '@ember/object';
import MenuMixin from '@base-cms/id-me-manage/components/list-controls/menu-mixin';

export default Component.extend(MenuMixin, {
  tagName: 'div',
  classNames: ['btn-group'],

  role: 'group',
  'aria-label': 'Display Search Types',

  init() {
    this._super(...arguments);
  },

  /**
   * The field to search against, e.g. `name`.
   * @public
   * @type {number}
   */
  field: null,

  /**
   * Whether the dropdown control is completely disabled.
   * @public
   * @type {boolean}
   */
  disabled: false,

  /**
   * The class to apply to buttons within this group
   * @public
   * @type {string}
   */
  buttonClass: 'btn-secondary',

  /**
   * Based on the `field` value, computes the selected search field.
   * For example, if the `field` value equals `name`, this would return
   * something like `{ key: 'name', label: 'Name' }`.
   */
  selected: computed('fields.[]', 'field', function() {
    return this.get('fields').findBy('key', this.get('field'));
  }),

  actions: {
    setField(value) {
      this.set('field', value);
    },
  },
});
