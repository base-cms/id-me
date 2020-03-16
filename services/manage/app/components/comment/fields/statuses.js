import Component from '@ember/component';

const { isArray } = Array;

export default Component.extend({
  classNames: ['form-group'],

  init() {
    this._super(...arguments);
    this.set('options', ['Approved', 'Rejected', 'Flagged', 'Banned'].sort());
    if (!isArray(this.selected)) this.set('selected', []);
  },
});
