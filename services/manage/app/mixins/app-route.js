import Mixin from '@ember/object/mixin';
import AppQueryMixin from '@base-cms/id-me-manage/mixins/app-query';
import { RouteQueryManager } from 'ember-apollo-client';
import { computed } from '@ember/object';

export default Mixin.create(RouteQueryManager, AppQueryMixin, {
  app: computed(function() {
    return this.modelFor('manage.orgs.org.apps.app');
  }),

  setupController(controller) {
    this._super(...arguments);
    controller.set('app', this.app);
  },
});
