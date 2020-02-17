import Controller from '@ember/controller';
import ActionMixin from '@identity-x/manage/mixins/action-mixin';
import AppQueryMixin from '@identity-x/manage/mixins/app-query';
import gql from 'graphql-tag';
import { inject } from '@ember/service';
import fragment from '@identity-x/manage/graphql/fragments/team-list';

const mutation = gql`
  mutation AppTeamEdit($input: UpdateTeamMutationInput!) {
    updateTeam(input: $input) {
      ...TeamListFragment
    }
  }
  ${fragment}
`;

export default Controller.extend(ActionMixin, AppQueryMixin, {
  errorNotifier: inject(),

  actions: {
    async update(closeModal) {
      try {
        this.startAction();
        const {
          id,
          name,
          description,
          domains,
          cidrs,
          accessLevels,
          active,
        } = this.get('model');

        const payload = {
          name,
          description,
          domains,
          cidrs,
          accessLevelIds: accessLevels.map(level => level.id),
          active,
        };
        const input = { id, payload };
        const variables = { input };
        await this.mutate({ mutation, variables }, 'updateTeam');
        await closeModal();
      } catch (e) {
        this.errorNotifier.show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
