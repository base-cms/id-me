import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'nav',
  classNames: ['navbar', 'navbar-expand', 'navbar-dark', 'bg-primary'],

  organizations: computed('userOrganizations', function() {
    return this.userOrganizations.map(({ organization }) => organization);
  }),
});
