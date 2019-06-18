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
      return this.router.transitionTo('manage.orgs.view.apps.view.teams');
    },

    addDomain(domain) {
      const formatted = this.formatTerm(domain);
      if (formatted) this.get('model.domains').pushObject(formatted);
    },

    changeDomains(domains) {
      this.set('model.domains', domains);
    },

    addCIDR(cidr) {
      const formatted = this.formatTerm(cidr);
      if (formatted) this.get('model.cidrs').pushObject(formatted);
    },

    changeCIDRs(cidrs) {
      this.set('model.cidrs', cidrs);
    },

    setAccessLevels(accessLevels) {
      this.set('model.accessLevels', accessLevels);
    },
  },
});
