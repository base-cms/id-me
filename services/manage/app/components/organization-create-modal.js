import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import mutation from '@base-cms/id-me-manage/gql/mutations/organization/create.graphql';

export default Component.extend(ActionMixin, {
  apollo: service(),
  // notify: inject(),
  isOpen: false,

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
    async createOrganization() {
      try {
        this.startAction();
        const { name, description } = this.getProperties('name', 'description');
        const input = { name, description };
        const variables = { input };
        const refetchQueries = ['MyOrganizations'];
        await this.apollo.mutate({ mutation, variables, refetchQueries, awaitRefetchQueries: true }, 'createOrganization');
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
