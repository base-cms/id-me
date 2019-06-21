import Controller from '@ember/controller';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import OrgQueryMixin from '@base-cms/id-me-manage/mixins/org-query';
import gql from 'graphql-tag';

const mutation = gql`
  mutation OrgUserInviteRemove($input: RemoveUserInviteMutationInput!) {
    removeUserInvite(input: $input)
  }
`;

export default Controller.extend(ActionMixin, OrgQueryMixin, {
  actions: {
    async removeInvitation(email) {
      if (!confirm(`Are you sure you want to cancel ${email}'s invitation?`)) return false;
      try {
        this.startAction();
        const variables = { input: { email } };
        const refetchQueries = ['OrgUsers'];
        await this.mutate({ mutation, variables, refetchQueries }, 'removeUserInvite');
      } catch (e) {
        this.get('graphErrors').show(e)
      } finally {
        this.endAction();
      }
    },
  }
})
