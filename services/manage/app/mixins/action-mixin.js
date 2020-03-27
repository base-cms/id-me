import Mixin from '@ember/object/mixin';
import LoadingMixin from '@identity-x/manage/mixins/loading-mixin';

export default Mixin.create(LoadingMixin, {
  isActionRunning: false,

  startAction({ prop = 'isActionRunning' } = {}) {
    this.showLoading();
    if (!this.isDestroyed) this.set(prop, true);
  },

  endAction({ prop = 'isActionRunning' } = {}) {
    if (!this.isDestroyed) this.set(prop, false);
    this.hideLoading();
  },

  startRouteAction({ prop = 'isActionRunning' } = {}) {
    this.showLoading();
    const controller = this.controllerFor(this.get('routeName'));
    controller.set(prop, true);
  },

  endRouteAction({ prop = 'isActionRunning' } = {}) {
    const controller = this.controllerFor(this.get('routeName'));
    controller.set(prop, false);
    this.hideLoading();
  },

  sendEventAction(name, ...args) {
    const fn = this.get(name);
    if (typeof fn === 'function') return fn(...args);
  },
});
