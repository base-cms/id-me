import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({
  tagName: 'li',
  classNames: ['nav-item', 'dropdown', 'dropdown--app'],

  context: inject(),

  active: computed('context.appId', function() {
    if (this.context.appId) return 'active';
    return null;
  }),

  apps: computed('context.{apps.[],appId}', function() {
    return this.context.apps.filter(app => app.id !== this.context.appId);
  }),
});
