import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({
  tagName: 'nav',
  classNames: ['navbar', 'navbar-expand', 'navbar-dark', 'bg-primary'],

  context: inject(),
  user: inject(),

  links: computed('context.orgId', function() {
    const orgId = this.get('context.orgId');
    if (!orgId) return [];
    return [
      { route: 'manage.orgs.org.apps', text: 'Applications' },
      { route: 'manage.orgs.org.users', text: 'Users' },
    ];
  }),
});
