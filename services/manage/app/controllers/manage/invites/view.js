import Controller from '@ember/controller';
import ActionMixin from '@identity-x/manage/mixins/action-mixin';
import { ObjectQueryManager } from 'ember-apollo-client';
import gql from 'graphql-tag';
import { inject } from '@ember/service';

const acceptOrgInvite = gql`
  mutation InvitesViewAccept($input: AcceptOrgInviteMutationInput!) {
    acceptOrgInvite(input: $input)
  }
`;

const rejectOrgInvite = gql`
  mutation InvitesViewReject($input: RejectOrgInviteMutationInput!) {
    rejectOrgInvite(input: $input)
  }
`;

export default Controller.extend(ActionMixin, ObjectQueryManager, {
  errorNotifier: inject(),

  actions: {
    async reject() {
      if (!confirm(`Are you sure you want to reject the invitation to ${this.get('model.organization.name')}?`)) return false;
      try {
        this.startAction();
        const organizationId = this.get('model.organization.id');
        const input = { organizationId };
        const variables = { input };
        const refetchQueries = ['Invitations'];
        await this.apollo.mutate({ mutation: rejectOrgInvite, variables, refetchQueries });
        this.transitionToRoute('manage');
      } catch (e) {
        this.errorNotifier.show(e);
      } finally {
        this.endAction();
      }
    },

    async accept() {
      try {
        this.startAction();
        const organizationId = this.get('model.organization.id');
        const input = { organizationId };
        const variables = { input };
        const refetchQueries = ['Orgs', 'Invitations'];
        await this.apollo.mutate({ mutation: acceptOrgInvite, variables, refetchQueries });
        await this.transitionToRoute('manage.orgs.view.apps', organizationId);
      } catch (e) {
        this.errorNotifier.show(e);
      } finally {
        this.endAction();
      }
    },
  }
})
