import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'ul',
  classNames: ['navbar-nav', 'mr-auto'],

  links: computed('appId', 'orgId', function() {
    const appId = this.get('appId');
    const orgId = this.get('orgId');

    if (appId) {
      return [
        { route: 'manage.orgs.org.apps.app.access-levels', target: appId, text: 'Access Levels' },
        { route: 'manage.orgs.org.apps.app.teams', target: appId, text: 'Teams' },
        { route: 'manage.orgs.org.apps.app.users', target: appId, text: 'Users' },
      ];
    }

    if (orgId) {
      return [
        { route: 'manage.orgs.org.users', target: orgId, text: 'Users' },
        { route: 'manage.orgs.org.apps', target: orgId, text: 'Apps' },
      ];
    }
    return [];
  }),
});
