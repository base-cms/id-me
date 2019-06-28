import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import { get } from '@ember/object';
import { inject } from '@ember/service';

export default Route.extend(ApplicationRouteMixin, ActionMixin, {
  routeAfterAuthentication: 'manage',
  errorNotifier: inject(),
  contextService: inject('context'),

  sessionAuthenticated() {
    if (this.session.redirectTo) {
      // A specific redirect was applied. Handle.
      const { name, segments } = this.session.redirectTo;
      this.transitionTo(name, ...(segments || []));
    } else {
      this._super(...arguments);
    }
  },

  /**
   * Ref https://github.com/simplabs/ember-simple-auth/issues/802#issuecomment-166377794
   */
  sessionInvalidated() {
    this.contextService.set('user', null);
    if (this.session.skipRedirectOnInvalidation) {
      this.set('session.skipRedirectOnInvalidation', false);
    } else {
      this._super(...arguments);
    }
  },

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
        const err = this.errorNotifier.handle(e);
        this.intermediateTransitionTo('application_error', err);
      }
    },
  },
});
