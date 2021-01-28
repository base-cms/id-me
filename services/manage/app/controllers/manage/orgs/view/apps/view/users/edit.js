import Controller from '@ember/controller';
import ActionMixin from '@identity-x/manage/mixins/action-mixin';
import AppQueryMixin from '@identity-x/manage/mixins/app-query';
import { inject } from '@ember/service';

export default Controller.extend(ActionMixin, AppQueryMixin, {
  router: inject(),

  actions: {
    returnToList() {
      return this.router.transitionTo('manage.orgs.view.apps.view.users');
    },
  },
});
