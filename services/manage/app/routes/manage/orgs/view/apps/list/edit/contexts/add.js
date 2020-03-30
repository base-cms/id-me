import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return {};
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('application', this.modelFor('manage.orgs.view.apps.list.edit'));
  },
});
