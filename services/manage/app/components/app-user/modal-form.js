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

  formatTerm(term) {
    return term.trim().toLowerCase();
  },

  actions: {
    returnToList() {
      return this.router.transitionTo('manage.orgs.view.apps.view.users');
    },

    setAccessLevels(accessLevels) {
      this.set('model.accessLevels', accessLevels);
    },

    setTeams(teams) {
      this.set('model.teams', teams);
    },
  },
});
