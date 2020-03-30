import Controller from '@ember/controller';
import ActionMixin from '@identity-x/manage/mixins/action-mixin';
import OrgQueryMixin from '@identity-x/manage/mixins/org-query';
import gql from 'graphql-tag';
import { inject } from '@ember/service';

const mutation = gql`
  mutation AppUpdate($input: UpdateApplicationMutationInput!) {
    updateApplication(input: $input) {
      id
      name
      email
      description
    }
  }
`;

export default Controller.extend(ActionMixin, OrgQueryMixin, {
  errorNotifier: inject(),

  actions: {
    async update() {
      try {
        this.startAction();
        const {
          id,
          name,
          description,
          email
        } = this.get('model');
        const payload = { name, description, email };
        const input = { id, payload };
        const variables = { input };
        await this.mutate({ mutation, variables }, 'updateApplication');
      } catch (e) {
        this.errorNotifier.show(e)
      } finally {
        this.endAction();
      }
    },
  }
})
