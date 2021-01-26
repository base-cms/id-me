import Controller from '@ember/controller';
import ActionMixin from '@identity-x/manage/mixins/action-mixin';
import AppQueryMixin from '@identity-x/manage/mixins/app-query';
import gql from 'graphql-tag';
import { inject } from '@ember/service';

const mutation = gql`
  mutation AppUserEditCustomSelectFields($input: UpdateAppUserCustomSelectAnswersMutationInput!) {
    updateAppUserCustomSelectAnswers(input: $input) {
      id
      customSelectFieldAnswers {
        id
        answers {
          id
          label
        }
      }
    }
  }
`;

export default Controller.extend(ActionMixin, AppQueryMixin, {
  errorNotifier: inject(),

  actions: {
    async save() {
      try {
        this.startAction();
        const input = {
          id: this.get('model.id'),
          answers: this.get('model.customSelectFieldAnswers').map(({ field, answers }) => {
            const optionIds = answers.map((answer) => answer.id);
            return { fieldId: field.id, optionIds };
          })
        };
        const variables = { input };
        await this.mutate({ mutation, variables }, 'updateAppUserCustomSelectAnswers');
      } catch (e) {
        this.errorNotifier.show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
