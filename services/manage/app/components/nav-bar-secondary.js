import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'nav',
  classNames: ['navbar', 'navbar-expand', 'navbar-light', 'bg-light'],

  links: computed('appId', function() {
    const appId = this.get('appId');
    if (!appId) return [];
    return [
      { route: 'manage.orgs.org.apps.app.access-levels', text: 'Access Levels' },
      { route: 'manage.orgs.org.apps.app.teams', text: 'Teams' },
      { route: 'manage.orgs.org.apps.app.users', text: 'Users' },
    ];
  }),
});
