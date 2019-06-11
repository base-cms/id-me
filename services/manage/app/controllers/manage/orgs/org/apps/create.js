import Controller from '@ember/controller';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import OrgQueryMixin from '@base-cms/id-me-manage/mixins/org-query';
import mutation from './create.graphql';

export default Controller.extend(ActionMixin, OrgQueryMixin, {
  actions: {
    async create() {
      try {
        this.startAction();
        const { name, description } = this.get('model');
        const input = { name, description };
        const variables = { input };
        const refetchQueries = ['Org'];
        await this.mutate({ mutation, variables, refetchQueries }, 'createApplication');
        await this.transitionToRoute('manage.orgs.org.apps');
      } catch (e) {
        this.get('graphErrors').show(e)
      } finally {
        this.endAction();
      }
    },

    async clear() {
      this.set('model', {});
      await this.transitionToRoute('manage.orgs.org.apps');
    },
  }
})
