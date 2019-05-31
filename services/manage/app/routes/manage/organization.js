import { RouteQueryManager } from 'ember-apollo-client';
import Route from '@ember/routing/route';

export default Route.extend(RouteQueryManager, {

  model({ id }) {
    this.userOrganizations = this.modelFor('manage');
    return this.userOrganizations.filter(({ organization }) => organization.id === id).firstObject.organization;
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('userOrganizations', this.userOrganizations);
  },

});
