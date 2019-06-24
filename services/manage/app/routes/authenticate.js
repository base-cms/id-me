import Route from '@ember/routing/route';
import { get } from '@ember/object';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(UnauthenticatedRouteMixin, {
  routeIfAlreadyAuthenticated: 'manage',

  session: service(),

  async beforeModel(transition) {
    const route = get(transition, 'to.queryParams.route');
    const isAuthenticated = await this.session.isAuthenticated;
    if (isAuthenticated && route) {
      transition.abort();
      await this.transitionTo(route);
    }
    return this._super(...arguments);
  },

  async model({ token }, transition) {
    const route = get(transition, 'to.queryParams.route');
    if (route) this.session.set('attemptedTransition', this.transitionTo(route));
    return this.session.authenticate('authenticator:application', token);
  },
});
