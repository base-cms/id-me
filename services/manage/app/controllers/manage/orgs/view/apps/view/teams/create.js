import Controller from '@ember/controller';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import AppQueryMixin from '@base-cms/id-me-manage/mixins/app-query';
import gql from 'graphql-tag';
import { inject } from '@ember/service';

const mutation = gql`
  mutation AppTeamCreate($input: CreateTeamMutationInput!) {
    createTeam(input: $input) {
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
        const {
          name,
          description,
          domains,
          cidrs,
          accessLevels,
        } = this.get('model');
        const input = {
          name,
          description,
          domains,
          cidrs,
          accessLevelIds: accessLevels.map(level => level.id),
        };
        const variables = { input };
        const refetchQueries = ['AppTeams'];
        await this.mutate({ mutation, variables, refetchQueries }, 'createTeam');
        await closeModal();
      } catch (e) {
        this.errorNotifier.show(e)
      } finally {
        this.endAction();
      }
    },
  },
});
