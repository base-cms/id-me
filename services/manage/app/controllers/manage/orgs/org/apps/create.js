import Controller from '@ember/controller';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import OrgQueryMixin from '@base-cms/id-me-manage/mixins/org-query';
import mutation from '@base-cms/id-me-manage/gql/mutations/applications/create';

export default Controller.extend(ActionMixin, OrgQueryMixin, {
  actions: {
    async create() {
      try {
        this.startAction();
        const { name, description } = this.get('model');
        const input = { name, description };
        const variables = { input };
        const refetchQueries = ['OrganizationApplications'];
        await this.mutate({ mutation, variables, refetchQueries }, 'createApplication');
        this.transitionToRoute('manage.orgs.org.apps');
      } catch (e) {
        this.get('graphErrors').show(e)
      } finally {
        this.endAction();
      }
    },

    clear() {
      this.set('model', {});
      this.transitionToRoute('manage.orgs.org.apps');
    },
  }
})
