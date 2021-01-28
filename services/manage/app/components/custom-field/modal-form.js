import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  router: inject(),

  tagName: '',
  title: null,
  isActionRunning: false,
  isUpdating: false,

  init() {
    this._super(...arguments);
    if (!this.model) this.set('model', {});
  },

  actions: {
    removeOption(option) {
      const confirm = `Are you sure you want to remove option ${option.label}? All users who previously selected ${option.label} will no longer have this data as an answer.`;
      if (this.isUpdating) {
        if (window.confirm(confirm)) this.get('model.options').removeObject(option);
      } else {
        this.get('model.options').removeObject(option);
      }
    },

    reorderOptions(options) {
      this.set('model.options', options);
    },

    returnToList() {
      return this.router.transitionTo('manage.orgs.view.apps.view.fields');
    },
  },
});
