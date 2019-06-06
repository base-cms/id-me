import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: null,

  user: service(),

  show: computed.reads('user.isAuthenticated'),
  showApps: computed('appId', 'apps.[]', function() {
    return this.get('apps.length') > 0;
  }),
  showOrgs: computed('appId', 'orgId', 'orgs.[]', function() {
    return !this.get('orgId') || this.get('orgs.length') > 0;
  }),

  apps: computed('appId', 'orgId', 'organization.applications.[]', function() {
    const appId = this.get('appId');
    const apps = this.get('organization.applications') || [];
    return apps.filter(({ id }) => id !== appId);
  }),

  orgs: computed('appId', 'orgId', 'organizations.[]', function() {
    const appId = this.get('appId');
    const orgId = this.get('orgId');
    const orgs = this.get('organizations') || [];
    return appId ? orgs : orgs.filter(({ id }) => id !== orgId);
  }),
});
