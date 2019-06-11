import Service from '@ember/service';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Service.extend({
  router: inject(),

  orgs: computed.mapBy('userOrganizations', 'organization'),

  orgId: computed('router.{currentRouteName,currentURL}', function() {
    const { currentURL, currentRouteName } = this.router;
    if (currentRouteName.includes('orgs.org')) return currentURL.match(/orgs\/([a-f0-9]{24})/i)[1];
  }),

  appId: computed('router.{currentRouteName,currentURL}', function() {
    const { currentURL, currentRouteName } = this.router;
    if (currentRouteName.includes('apps.app')) return currentURL.match(/apps\/([a-f0-9]{24})/i)[1];
  }),

  org: computed('orgId', 'orgs.[]', function() {
    const orgId = this.get('orgId');
    const orgs = this.get('orgs') || [];
    return orgs.filter(({ id }) => id === orgId).reduce((_, org) => org, {});
  }),

  app: computed('appId', 'apps.[]', function() {
    const appId = this.get('appId');
    const apps = this.get('apps') || [];
    return apps.filter(({ id }) => id === appId).reduce((_, app) => app, {});
  }),
});
