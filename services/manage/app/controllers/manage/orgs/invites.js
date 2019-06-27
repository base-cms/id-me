import Controller from '@ember/controller';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import { ObjectQueryManager } from 'ember-apollo-client';
import gql from 'graphql-tag';
import { inject } from '@ember/service';

const mutation = gql`
  mutation AcceptInvite($input: AcceptOrgInviteMutationInput!) {
    acceptOrgInvite(input: $input)
  }
`;

export default Controller.extend(ActionMixin, ObjectQueryManager, {
  errorNotifier: inject(),

  actions: {
    async accept(organizationId) {
      try {
        this.startAction();
        const input = { organizationId };
        const variables = { input };
        const refetchQueries = ['Orgs', 'Invitations'];
        await this.apollo.mutate({ mutation, variables, refetchQueries });
        await this.transitionToRoute('manage.orgs.view', organizationId);
      } catch (e) {
        this.errorNotifier.show(e);
      } finally {
        this.endAction();
      }
    },
  }
})
