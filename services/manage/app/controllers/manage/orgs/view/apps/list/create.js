import Controller from '@ember/controller';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import OrgQueryMixin from '@base-cms/id-me-manage/mixins/org-query';
import gql from 'graphql-tag';
import { inject } from '@ember/service';

const mutation = gql`
  mutation OrgAppCreate($input: CreateApplicationMutationInput!) {
    createApplication(input: $input) {
      id
      name
      description
    }
  }
`;

export default Controller.extend(ActionMixin, OrgQueryMixin, {
  errorNotifier: inject(),

  actions: {
    async create(closeModal) {
      try {
        this.startAction();
        const { name, description } = this.get('model');
        const input = { name, description };
        const variables = { input };
        const refetchQueries = ['Org', 'OrgApps'];
        await this.mutate({ mutation, variables, refetchQueries }, 'createApplication');
        await closeModal();
      } catch (e) {
        this.errorNotifier.show(e)
      } finally {
        this.endAction();
      }
    },

    returnToAppList() {
      return this.transitionToRoute('manage.orgs.view.apps.list');
    },
  }
})
