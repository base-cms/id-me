import Controller from '@ember/controller';
import ActionMixin from '@identity-x/manage/mixins/action-mixin';
import AppQueryMixin from '@identity-x/manage/mixins/app-query';
import gql from 'graphql-tag';
import { inject } from '@ember/service';

const mutation = gql`
  mutation AppSelectFieldCreate($input: CreateSelectFieldMutationInput!) {
    createSelectField(input: $input) {
      id
    }
  }
`;

export default Controller.extend(ActionMixin, AppQueryMixin, {
  errorNotifier: inject(),
  router: inject(),

  actions: {
    /**
     *
     * @param {*} closeModal
     */
    async create(closeModal) {
      try {
        this.startAction();
        const {
          name,
          label,
        } = this.get('model');
        const input = {
          name,
          label,
        };
        const variables = { input };
        const refetchQueries = ['AppFields'];
        await this.mutate({ mutation, variables, refetchQueries }, 'createSelectField');
        await closeModal();
      } catch (e) {
        this.errorNotifier.show(e);
      } finally {
        this.endAction();
      }
    },

    returnToList() {
      return this.router.transitionTo('manage.orgs.view.apps.view.fields');
    },
  },
});
