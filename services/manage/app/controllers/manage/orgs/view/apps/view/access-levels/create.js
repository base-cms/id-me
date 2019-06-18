import Controller from '@ember/controller';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import AppQueryMixin from '@base-cms/id-me-manage/mixins/app-query';
import gql from 'graphql-tag';
import { inject } from '@ember/service';

const mutation = gql`
  mutation AppAccessLevelCreate($input: CreateAccessLevelMutationInput!) {
    createAccessLevel(input: $input) {
      id
    }
  }
`;

export default Controller.extend(ActionMixin, AppQueryMixin, {
  errorNotifier: inject(),

  actions: {
    async create(closeModal) {
      try {
        this.startAction();
        const { name, description } = this.get('model');
        const input = { name, description };
        const variables = { input };
        const refetchQueries = ['AppAccessLevels'];
        await this.mutate({ mutation, variables, refetchQueries }, 'createAccessLevel');
        await closeModal();
      } catch (e) {
        this.errorNotifier.show(e)
      } finally {
        this.endAction();
      }
    },

    returnToList() {
      return this.transitionToRoute('manage.orgs.view.apps.view.access-levels');
    },
  }
})
