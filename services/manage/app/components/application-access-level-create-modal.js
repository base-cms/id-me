import Component from '@ember/component';
import { computed } from '@ember/object';
// import { inject } from '@ember/service';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import ApplicationContext from '@base-cms/id-me-manage/mixins/application-context';
import mutation from '@base-cms/id-me-manage/gql/mutations/applications/create-access-level';

export default Component.extend(ActionMixin, ApplicationContext, {
  // notify: inject(),
  isOpen: false,
  appId: null,

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
    async createAccessLevel() {
      try {
        this.startAction();
        const id = this.get('appId');
        const { name, description } = this.getProperties('name', 'description');
        const input = { name, description };
        const variables = { input };
        const refetchQueries = ['ApplicationAccessLevels'];
        await this.mutate(id, { mutation, variables, refetchQueries, awaitRefetchQueries: true }, 'createAccessLevel');
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
