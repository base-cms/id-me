import { RouteQueryManager } from 'ember-apollo-client';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';

export default Route.extend(AuthenticatedRouteMixin, RouteQueryManager, {
  afterModel(model, transition) {
    if (transition.to.name === 'manage.index') this.transitionTo('manage.orgs');
  },
});
