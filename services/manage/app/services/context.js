import Service from '@ember/service';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Service.extend({
  router: inject(),

  orgs: computed.mapBy('userOrganizations', 'organization'),

  pathname: computed('router.currentURL', function() {
    return this.router.currentURL || window.location.pathname;
  }),

  orgId: computed('pathname', function() {
    const matches = this.pathname.match(/^\/orgs\/([a-f0-9]{24})/);
    return matches ? matches[1] : undefined;
  }),

  appId: computed('pathname', function() {
    const matches = this.pathname.match(/^\/orgs\/[a-f0-9]{24}\/apps\/([a-f0-9]{24})/);
    return matches ? matches[1] : undefined;
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
