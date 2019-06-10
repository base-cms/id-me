import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: null,

  user: service(),
  show: computed.reads('user.isAuthenticated'),

  org: computed('orgId', 'organizations.[]', function() {
    const orgId = this.get('orgId');
    const orgs = this.get('organizations') || [];
    return orgs.filter(({ id }) => id === orgId).reduce((_, org) => org, {});
  }),

  orgName: computed.reads('org.name'),
  orgPhoto: computed.reads('org.photoURL'),
});
