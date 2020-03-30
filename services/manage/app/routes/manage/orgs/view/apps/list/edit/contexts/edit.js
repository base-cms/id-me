import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';

const { isArray } = Array;

export default Route.extend(RouteQueryManager, {
  async model({ context_id: id }) {
    const application = this.modelFor('manage.orgs.view.apps.list.edit');
    const contexts = isArray(application.contexts) ? application.contexts : [];
    const context = contexts.find(c => c.id == id);
    if (!context) throw new Error(`No application context found for ${id}`);
    return context;
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('application', this.modelFor('manage.orgs.view.apps.list.edit'));
  },
});
