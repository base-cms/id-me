import Controller from '@ember/controller';
import ActionMixin from '@identity-x/manage/mixins/action-mixin';
import AppQueryMixin from '@identity-x/manage/mixins/app-query';
import gql from 'graphql-tag';
import { inject } from '@ember/service';
import fragment from '@identity-x/manage/graphql/fragments/access-level-list';

const mutation = gql`
  mutation AppAccessLevelEdit($input: UpdateAccessLevelMutationInput!) {
    updateAccessLevel(input: $input) {
      ...AccessLevelListFragment
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
        const { id, name, description, messages = {} } = this.get('model');
        const { loggedInNoAccess, loggedOutNoAccess } = messages;

        const payload = {
          name,
          description,
          messages: { loggedInNoAccess, loggedOutNoAccess },
        };
        const input = { id, payload };
        const variables = { input };
        await this.mutate({ mutation, variables }, 'updateAccessLevel');
        await closeModal();
      } catch (e) {
        this.errorNotifier.show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
