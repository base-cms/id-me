import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({
  tagName: 'nav',
  classNames: ['navbar', 'navbar--primary', 'navbar-expand', 'navbar-dark'],

  context: inject(),
  user: inject(),

  links: computed('context.orgId', function() {
    const orgId = this.get('context.orgId');
    if (!orgId) return [];
    return [
      { route: 'manage.orgs.view.apps.list', text: 'Applications' },
      { route: 'manage.orgs.view.users', text: 'Users' },
    ];
  }),
});
