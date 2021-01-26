import Controller from '@ember/controller';
import ActionMixin from '@identity-x/manage/mixins/action-mixin';
import AppQueryMixin from '@identity-x/manage/mixins/app-query';
import gql from 'graphql-tag';
import { inject } from '@ember/service';
import fragment from '@identity-x/manage/graphql/fragments/app-user-list';

const mutation = gql`
  mutation AppUserEdit($input: UpdateAppUserMutationInput!) {
    updateAppUser(input: $input) {
      ...AppUserListFragment
    }
  }
  ${fragment}
`;

export default Controller.extend(ActionMixin, AppQueryMixin, {
  errorNotifier: inject(),

  actions: {
    async save() {
      try {
        this.startAction();
        const { customSelectFieldAnswers } = this.get('model');

        const data = customSelectFieldAnswers.map(({ field, answers }) => {
          const optionIds = answers.map((answer) => answer.id);
          return { fieldId: field.id, optionIds };
        });

        console.log(data);
      } catch (e) {
        this.errorNotifier.show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
