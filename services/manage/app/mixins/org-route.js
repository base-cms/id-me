import Mixin from '@ember/object/mixin';
import OrgQueryMixin from '@base-cms/id-me-manage/mixins/org-query';
import { RouteQueryManager } from 'ember-apollo-client';
import { computed } from '@ember/object';

export default Mixin.create(RouteQueryManager, OrgQueryMixin, {
  org: computed(function() {
    return this.modelFor('manage.orgs.org');
  }),

  setupController(controller) {
    this._super(...arguments);
    controller.set('org', this.org);
  },
});
