import Controller from '@ember/controller';
import ActionMixin from '@identity-x/manage/mixins/action-mixin';
import OrgQueryMixin from '@identity-x/manage/mixins/org-query';

export default Controller.extend(ActionMixin, OrgQueryMixin, {
  actions: {
    async update() {

    },
  },
});
