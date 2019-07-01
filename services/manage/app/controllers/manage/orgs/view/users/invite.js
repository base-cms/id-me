import Controller from '@ember/controller';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import OrgQueryMixin from '@base-cms/id-me-manage/mixins/org-query';
import gql from 'graphql-tag';
import { inject } from '@ember/service';

const mutation = gql`
  mutation OrgUserInvite($input: InviteUserToOrgMutationInput!) {
    inviteUserToOrg(input: $input)
  }
`;

export default Controller.extend(ActionMixin, OrgQueryMixin, {
  errorNotifier: inject(),

  init() {
    this._super(...arguments);
    this.set('roles', ['Owner', 'Administrator', 'Member', 'Guest']);
  },

  actions: {
    async create(closeModal) {
      try {
        this.startAction();
        const { email, role } = this.get('model');
        const input = { email, role };
        const variables = { input };
        const refetchQueries = ['OrgUsers'];
        await this.mutate({ mutation, variables, refetchQueries }, 'inviteUserToOrg');
        await closeModal();
      } catch (e) {
        this.errorNotifier.show(e);
      } finally {
        this.endAction();
      }
    },

    setRole(role) {
      this.set('model.role', role);
    },

    returnToList() {
      return this.transitionToRoute('manage.orgs.view.users');
    },
  }
})
