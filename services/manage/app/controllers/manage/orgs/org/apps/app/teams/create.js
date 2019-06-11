import Controller from '@ember/controller';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import AppQueryMixin from '@base-cms/id-me-manage/mixins/app-query';
import mutation from '@base-cms/id-me-manage/gql/mutations/applications/create-team';

export default Controller.extend(ActionMixin, AppQueryMixin, {
  actions: {
    async create() {
      try {
        this.startAction();
        const { name, description } = this.get('model');
        const input = { name, description };
        const variables = { input };
        const refetchQueries = ['ApplicationTeams'];
        await this.mutate({ mutation, variables, refetchQueries }, 'createTeam');
        this.transitionToRoute('manage.orgs.org.apps.app.teams');
      } catch (e) {
        this.get('graphErrors').show(e)
      } finally {
        this.endAction();
      }
    },

    clear() {
      this.set('model', {});
      this.transitionToRoute('manage.orgs.org.apps.app.teams');
    },
  }
})