import Component from '@ember/component';

export default Component.extend({
  tagName: 'li',
  classNames: ['nav-item', 'dropdown', 'dropdown--user'],
  isUserProfileOpen: false,

  actions: {
    openUserProfile() {
      this.set('isUserProfileOpen', true);
    },
  },
});
