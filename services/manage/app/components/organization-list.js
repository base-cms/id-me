import Component from '@ember/component';

export default Component.extend({
  classNames: ['card', 'mb-3'],
  isModalOpen: false,

  actions: {
    showCreateModal() {
      this.set('isModalOpen', true);
    },
  },
});
