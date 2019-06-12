import Service from '@ember/service';

export default Service.extend({
  isShowing: false,
  show() {
    if (!this.get('isShowing')) {
      this.set('isShowing', true);
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('transitioning');
    }
  },
  hide() {
    window.setTimeout(() => {
      this.set('isShowing', false);
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('transitioning');
    }, 100);
  },
});
