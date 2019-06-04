import Component from '@ember/component';
import { computed } from '@ember/object';
// import { inject } from '@ember/service';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import OrganizationContext from '@base-cms/id-me-manage/mixins/organization-context';
import mutation from '@base-cms/id-me-manage/gql/mutations/user/invite-to-org';

export default Component.extend(ActionMixin, OrganizationContext, {
  // notify: inject(),

  organization: null,
  email: null,
  role: 'Guest',
  isOpen: false,

  init() {
    this._super(...arguments);
    this.set('roles', ['Owner', 'Administrator', 'Member', 'Guest']);
  },

  canSubmit: computed('reasonForPreventSubmit', function() {
    return (!this.get('reasonForPreventSubmit')) ? true : false;
  }),

  isSubmitDisabled: computed('canSubmit', 'isActionRunning', function() {
    if (this.get('isActionRunning')) return true;
    if (this.get('canSubmit')) return false;
    return true;
  }),

  reasonForPreventSubmit: computed('{email,role}', function() {
    if (!this.get('email') || !this.get('role')) {
      return 'fill out all required fields.';
    }
    return null;
  }),

  actions: {
    async sendInvitation() {
      try {
        this.startAction();
        const { id: orgId } = this.get('organization');
        const { email, role } = this.getProperties('email', 'role');
        const input = { email, role };
        const variables = { input };
        const refetchQueries = ['OrganizationUsersAndInvitations'];
        await this.mutate(orgId, { mutation, variables, refetchQueries, awaitRefetchQueries: true }, 'inviteUserToOrg');
        this.set('isOpen', false);
        // this.get('notify').info('Invitation sent.');
      } catch (e) {
        this.get('graphErrors').show(e)
      } finally {
        this.endAction();
      }
    },

    clear() {
      this.setProperties({
        email: undefined,
        givenName: undefined,
        familyName: undefined,
        role: undefined,
      });
    },
  },

});
