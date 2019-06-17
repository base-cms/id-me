import Service from '@ember/service';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Service.extend({
  router: inject(),

  orgs: computed.mapBy('userOrganizations', 'organization'),
  apps: computed.map('orgAppQuery.organizationApplications', function(app) {
    return app;
  }),

  orgId: computed.reads('orgAppQuery.activeOrganization.id'),

  appId: computed.reads('app.id'),

  org: computed('orgId', function() {
    const orgId = this.get('orgId');
    return orgId ? this.get('orgAppQuery.activeOrganization') : {};
  }),
});
