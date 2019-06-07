import Component from '@ember/component';
import { computed } from '@ember/object';
// import { inject } from '@ember/service';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import OrganizationContext from '@base-cms/id-me-manage/mixins/organization-context';
import mutation from '@base-cms/id-me-manage/gql/mutations/applications/create';

export default Component.extend(ActionMixin, OrganizationContext, {
  // notify: inject(),
  isOpen: false,
  orgId: null,

  name: null,
  description: null,

  canSubmit: computed('reasonForPreventSubmit', function() {
    return (!this.get('reasonForPreventSubmit')) ? true : false;
  }),

  isSubmitDisabled: computed('canSubmit', 'isActionRunning', function() {
    if (this.get('isActionRunning')) return true;
    if (this.get('canSubmit')) return false;
    return true;
  }),

  reasonForPreventSubmit: computed('name', function() {
    if (!this.get('name')) return 'specify a name.';
    return null;
  }),

  actions: {
    async createApplication() {
      try {
        this.startAction();
        const id = this.get('orgId');
        const { name, description } = this.getProperties('name', 'description');
        const input = { name, description };
        const variables = { input };
        const refetchQueries = ['OrganizationApplications'];
        await this.mutate(id, { mutation, variables, refetchQueries, awaitRefetchQueries: true }, 'createApplication');
        this.set('isOpen', false);
        // this.get('notify').info('Application created.');
      } catch (e) {
        this.get('graphErrors').show(e)
      } finally {
        this.endAction();
      }
    },

    clear() {
      this.setProperties({
        name: undefined,
        description: undefined,
      });
    },
  },

});
