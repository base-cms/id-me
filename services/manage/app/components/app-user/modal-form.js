import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  router: inject(),

  tagName: '',
  title: null,
  isActionRunning: false,

  init() {
    this._super(...arguments);
    if (!this.model) this.set('model', {});
  },

  actions: {
    returnToList() {
      return this.router.transitionTo('manage.orgs.view.apps.view.users');
    },
  },
});
