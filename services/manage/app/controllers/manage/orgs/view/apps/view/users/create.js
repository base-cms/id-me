import Controller from '@ember/controller';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import AppQueryMixin from '@base-cms/id-me-manage/mixins/app-query';
import gql from 'graphql-tag';
import { inject } from '@ember/service';

const mutation = gql`
  mutation AppUserCreate($input: ManageCreateAppUserMutationInput!) {
    manageCreateAppUser(input: $input) {
      id
      givenName
      familyName
      email
    }
  }
`;

export default Controller.extend(ActionMixin, AppQueryMixin, {
  errorNotifier: inject(),

  actions: {
    async create(closeModal) {
      try {
        this.startAction();
        const {
          givenName,
          familyName,
          email,
          accessLevels,
          teams,
        } = this.get('model');
        const input = {
          givenName,
          familyName,
          email,
          accessLevelIds: accessLevels.map(level => level.id),
          teamIds: teams.map(team => team.id),
        };
        const variables = { input };
        const refetchQueries = ['AppUsers'];
        await this.mutate({ mutation, variables, refetchQueries }, 'createAppUser');
        await closeModal();
      } catch (e) {
        this.errorNotifier.show(e);
      } finally {
        this.endAction();
      }
    },

    returnToList() {
      return this.transitionToRoute('manage.orgs.view.apps.view.users');
    },
  }
})
