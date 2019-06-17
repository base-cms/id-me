import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import { get } from '@ember/object';
import { inject } from '@ember/service';

export default Route.extend(ApplicationRouteMixin, ActionMixin, {
  routeAfterAuthentication: 'manage',
  errorNotifier: inject(),

  actions: {
    showLoading() {
      this.showLoading();
    },

    hideLoading() {
      this.hideLoading();
    },

    transitionTo(name) {
      return this.transitionTo(name);
    },

    transitionWithModel(routeName, model) {
      return this.transitionTo(routeName, get(model, 'id'));
    },

    scrollToTop() {
      window.scrollTo(0, 0);
    },

    /**
     *
     * @param {*} transition
     */
    loading(transition) {
      this.showLoading();
      transition.finally(() => this.hideLoading());
    },

    /**
     *
     * @param {Error} e
     */
    error(e) {
      if (this.errorNotifier.isReady()) {
        this.errorNotifier.show(e);
      } else {
        this.intermediateTransitionTo('application_error', e);
      }
    },
  },
});
