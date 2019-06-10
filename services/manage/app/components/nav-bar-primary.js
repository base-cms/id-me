import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'nav',
  classNames: ['navbar', 'navbar-expand', 'navbar-dark', 'bg-primary'],

  links: computed('orgId', function() {
    const orgId = this.get('orgId');
    if (!orgId) return [];
    return [
      { route: 'manage.orgs.org.apps', text: 'Applications' },
      { route: 'manage.orgs.org.users', text: 'Users' },
    ];
  }),
});
