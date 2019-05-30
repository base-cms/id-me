import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import { get } from '@ember/object';

export default Route.extend(ApplicationRouteMixin, ActionMixin, {
  routeAfterAuthentication: 'manage',
  user: service(),

  beforeModel(transition) {
    this._super(...arguments);
    const token = get(transition, 'to.queryParams.token');
    if (token) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await this.user.login(token);
          if (data) {
            delete transition.to.queryParams.token;
            transition.abort();
            this.transitionTo(transition.to.name, { queryParams: {} });
            resolve();
          } else {
            reject(new Error('An invalid token was encountered'));
          }
        } catch (e) {
          reject(e);
        }
      });
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
      if (this.get('graphErrors').isReady()) {
        this.get('graphErrors').show(e);
      } else {
        this.intermediateTransitionTo('application_error', e);
      }
    },
  },
});
