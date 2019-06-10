import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: 'header',

  router: service(),

  appId: computed('router.{currentRouteName,currentURL}', function() {
    const { currentURL, currentRouteName } = this.router;
    if (currentRouteName.includes('apps.app')) return currentURL.match(/apps\/([a-f0-9]{24})/i)[1];
  }),
  application: computed('appId,applications.[]', function() {
    const appId = this.get('appId');
    const apps = this.get('applications') || [];
    return apps.filter(({ id }) => id === appId).reduce((o, v) => v, null);
  }),

  orgId: computed('router.{currentRouteName,currentURL}', function() {
    const { currentURL, currentRouteName } = this.router;
    if (currentRouteName.includes('orgs.org')) return currentURL.match(/orgs\/([a-f0-9]{24})/i)[1];
  }),
  organization: computed('orgId,organizations.[]', function() {
    const orgId = this.get('orgId');
    const orgs = this.get('organizations') || [];
    return orgs.filter(({ id }) => id === orgId).reduce((o, v) => v, null);
  }),

  organizations: computed.mapBy('userOrganizations', 'organization'),
  applications: computed.reads('organization.applications'),
});
