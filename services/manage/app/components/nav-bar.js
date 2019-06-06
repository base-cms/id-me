import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

const findOrgId = (leaf) => {
  const { org_id: id } = leaf.params;
  if (id) return id;
  if (leaf.parent) return findOrgId(leaf.parent);
  return null;
};

const findAppId = (leaf) => {
  const { app_id: id } = leaf.params;
  if (id) return id;
  if (leaf.parent) return findAppId(leaf.parent);
  return null;
};

export default Component.extend({
  tagName: 'nav',
  classNames: ['navbar', 'navbar-expand', 'navbar-dark', 'bg-primary'],

  router: service(),

  appId: computed('router.currentRoute', function() {
    return findAppId(this.router.currentRoute);
  }),

  orgId: computed('router.currentRoute', function() {
    return findOrgId(this.router.currentRoute);
  }),

  organizations: computed('userOrganizations', function() {
    return this.userOrganizations.map(({ organization }) => organization);
  }),
});
