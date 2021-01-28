import Controller from '@ember/controller';
import ActionMixin from '@identity-x/manage/mixins/action-mixin';
import AppQueryMixin from '@identity-x/manage/mixins/app-query';
import gql from 'graphql-tag';
import { inject } from '@ember/service';

const mutation = gql`
  mutation AppFieldEdit($input: UpdateSelectFieldMutationInput!) {
    updateSelectField(input: $input) {
      id
      name
      label
      multiple
      required
      active
      options {
        id
        label
      }
    }
  }
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
          label,
          multiple,
          required,
          active,
          options,
        } = this.get('model');

        const input = {
          id,
          name,
          label,
          multiple,
          required,
          active,
          options: options.map((option) => ({ id: option.id, label: option.label })),
        };
        const variables = { input };
        await this.mutate({ mutation, variables }, 'updateSelectField');
        await closeModal();
      } catch (e) {
        this.errorNotifier.show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
