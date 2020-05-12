import Component from '@ember/component';

export default Component.extend({
  init() {
    this._super(...arguments);
    if (!Array.isArray(this.policies)) this.policies = [];
  },
});
