import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({
  tagName: 'li',
  classNames: ['nav-item', 'dropdown', 'dropdown--org'],

  context: inject(),

  active: computed('context.orgId', function() {
    if (this.context.orgId) return 'active';
    return null;
  }),

  orgs: computed('context.{orgs.[],orgId}', function() {
    return this.context.orgs.filter(org => org.id !== this.context.orgId);
  }),
});
