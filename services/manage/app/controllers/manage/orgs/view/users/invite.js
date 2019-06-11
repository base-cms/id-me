import Controller from '@ember/controller';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import OrgQueryMixin from '@base-cms/id-me-manage/mixins/org-query';
import gql from 'graphql-tag';

const mutation = gql`
  mutation OrgUserInvite($input: InviteUserToOrgMutationInput!) {
    inviteUserToOrg(input: $input)
  }
`;

export default Controller.extend(ActionMixin, OrgQueryMixin, {
  role: 'Member',

  init() {
    this._super(...arguments);
    this.set('roles', ['Owner', 'Administrator', 'Member', 'Guest']);
  },

  actions: {
    async create() {
      try {
        this.startAction();
        const { email, role } = this.get('model');
        const input = { email, role };
        const variables = { input };
        const refetchQueries = ['OrgUsers'];
        await this.mutate({ mutation, variables, refetchQueries }, 'inviteUserToOrg');
        await this.transitionToRoute('manage.orgs.view.users');
      } catch (e) {
        this.get('graphErrors').show(e)
      } finally {
        this.endAction();
      }
    },

    async clear() {
      this.set('model', {});
      await this.transitionToRoute('manage.orgs.view.users');
    },
  }
})
