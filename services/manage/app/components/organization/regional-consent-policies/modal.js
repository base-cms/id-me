import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  router: inject(),

  init() {
    this._super(...arguments);
    if (!this.model) this.set('model', {});
  },

  actions: {
    returnToSettings() {
      return this.router.transitionTo('manage.orgs.view.settings');
    },
  },
});
