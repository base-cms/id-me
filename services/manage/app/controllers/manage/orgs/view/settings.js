import Controller from '@ember/controller';
import ActionMixin from '@identity-x/manage/mixins/action-mixin';
import OrgQueryMixin from '@identity-x/manage/mixins/org-query';
import { inject } from '@ember/service';
import gql from 'graphql-tag';

const mutation = gql`
  mutation SaveOrganizationSettings($input: UpdateOrganizationMutationInput!) {
    updateOrganization(input: $input) {
      id
      name
      description
      consentPolicy
    }
  }
`;

export default Controller.extend(ActionMixin, OrgQueryMixin, {
  errorNotifier: inject(),

  actions: {
    async save() {
      try {
        this.startAction();
        const {
          id,
          name,
          description,
          consentPolicy,
        } = this.model;
        const payload = { name, description, consentPolicy };
        const input = { id, payload };
        const variables = { input };
        await this.mutate({ mutation, variables }, 'updateOrganization');
      } catch (e) {
        this.errorNotifier.show(e);
      } finally {
        this.endAction();
      }
    },
  }
})
