import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({
  tagName: 'nav',
  classNames: ['navbar', 'navbar-expand', 'navbar-light', 'bg-light'],

  context: inject(),

  links: computed('context.appId', function() {
    const appId = this.get('context.appId');
    if (!appId) return [];
    return [
      { route: 'manage.orgs.view.apps.view.access-levels', text: 'Access Levels' },
      { route: 'manage.orgs.view.apps.view.teams', text: 'Teams' },
      { route: 'manage.orgs.view.apps.view.users', text: 'Users' },
    ];
  }),
});
