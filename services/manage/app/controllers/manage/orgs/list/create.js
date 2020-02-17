import Controller from '@ember/controller';
import ActionMixin from '@identity-x/manage/mixins/action-mixin';
import OrgQueryMixin from '@identity-x/manage/mixins/org-query';
import gql from 'graphql-tag';
import { inject } from '@ember/service';

const mutation = gql`
  mutation OrgCreate($input: CreateOrganizationMutationInput!) {
    createOrganization(input: $input) {
      id
      name
      description
      photoURL
    }
  }
`;

export default Controller.extend(ActionMixin, OrgQueryMixin, {
  errorNotifier: inject(),

  actions: {
    async create(closeModal) {
      try {
        this.startAction();
        const { name, description } = this.get('model');
        const input = { name, description };
        const variables = { input };
        const refetchQueries = ['Orgs'];
        await this.mutate({ mutation, variables, refetchQueries }, 'createOrganization');
        await closeModal();
      } catch (e) {
        this.errorNotifier.show(e)
      } finally {
        this.endAction();
      }
    },

    returnToOrgList() {
      return this.transitionToRoute('manage.orgs.list');
    },
  }
})
