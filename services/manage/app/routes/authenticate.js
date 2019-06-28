import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(UnauthenticatedRouteMixin, {
  routeIfAlreadyAuthenticated: 'manage',

  queryParams: {
    routeName: { refreshModel: false, replace: false, as: 'route-name' },
    routeSegments: { refreshModel: false, replace: false, as: 'route-segments' },
  },

  async beforeModel() {
    if (this.session.isAuthenticated) {
      // If a user is already present, log them out (but do not redirect).
      this.set('session.skipRedirectOnInvalidation', true);
      await this.session.invalidate();
    }
  },

  model({ token, routeName, routeSegments }) {
    if (routeName) {
      // A route redirect was specified. Apply it to the session.
      const segments = routeSegments ? JSON.parse(routeSegments) : [];
      this.session.set('redirectTo', { name: routeName, segments });
    }
    return this.session.authenticate('authenticator:application', token);
  },
});
