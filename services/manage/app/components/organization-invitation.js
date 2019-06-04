import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import OrganizationContext from '@base-cms/id-me-manage/mixins/organization-context';
import mutation from '@base-cms/id-me-manage/gql/mutations/user/remove-invitation';

export default Component.extend(ActionMixin, OrganizationContext, {
  tagName: 'tr',

  user: service(),

  canModify: computed.not('isCurrentUser'),
  isCurrentUser: computed('invitation.user.id', 'user.model.id', function() {
    return `${this.get('invitation.user.id')}` === `${this.get('user.model.id')}`;
  }),

  actions: {
    async removeInvitation() {
      try {
        this.startAction();
        const id = this.get('invitation.organization.id');
        const email = this.get('invitation.user.email');
        const variables = { input: { email } };
        const refetchQueries = ['OrganizationUsersAndInvitations'];
        await this.mutate(id, { mutation, variables, refetchQueries }, 'removeUserInvite');
        this.set('isOpen', false);
        // this.get('notify').info('Invitation sent.');
      } catch (e) {
        this.get('graphErrors').show(e)
      } finally {
        this.endAction();
      }
    },
  }

});
