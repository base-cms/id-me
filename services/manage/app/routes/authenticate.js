import Route from '@ember/routing/route';
import { get } from '@ember/object';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(UnauthenticatedRouteMixin, {
  routeIfAlreadyAuthenticated: 'manage',

  async beforeModel() {
    if (this.session.isAuthenticated) {
      // If a user is already present, log them out (but do not redirect).
      this.set('session.skipRedirectOnInvalidation', true);
      await this.session.invalidate();
    }
  },

  async model({ token }, transition) {
    const route = get(transition, 'to.queryParams.route');
    if (route) this.session.set('attemptedTransition', this.transitionTo(route));
    return this.session.authenticate('authenticator:application', token);
  },
});
