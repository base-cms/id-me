import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: 'nav',
  classNames: ['navbar', 'navbar-expand', 'navbar-dark', 'bg-primary'],

  router: service(),

  appId: computed('router.{currentRouteName,currentURL}', function() {
    const { currentURL, currentRouteName } = this.router;
    if (currentRouteName.includes('apps.app')) return currentURL.match(/apps\/([a-f0-9]{24})/i)[1];
  }),

  orgId: computed('router.{currentRouteName,currentURL}', function() {
    const { currentURL, currentRouteName } = this.router;
    if (currentRouteName.includes('orgs.org')) return currentURL.match(/orgs\/([a-f0-9]{24})/i)[1];
  }),

  organizations: computed.mapBy('userOrganizations', 'organization'),
});
