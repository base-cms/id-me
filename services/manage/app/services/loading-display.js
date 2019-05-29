import Service from '@ember/service';
import jQuery from 'jquery';

export default Service.extend({
  isShowing: false,
  show() {
    if (!this.get('isShowing')) {
      this.set('isShowing', true);
      jQuery('body').addClass('transitioning');
    }
  },
  hide() {
    window.setTimeout(() => {
      this.set('isShowing', false);
      jQuery('body').removeClass('transitioning');
    }, 100);
  },
});
