import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',
  user: service(),
  isModalOpen: computed.reads('user.profileShown'),

  actions: {
    showModal() {
      this.set('isModalOpen', true);
    },
  },
});
