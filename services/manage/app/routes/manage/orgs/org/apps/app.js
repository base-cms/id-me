import Route from '@ember/routing/route';
import query from '@base-cms/id-me-manage/gql/queries/application/application';
import ApplicationContext from '@base-cms/id-me-manage/mixins/application-context';

export default Route.extend(ApplicationContext, {

  model({ app_id: id }) {
    const variables = { input: { id } };
    return this.query(id, { query, variables }, 'application');
  },

  afterModel(model) {
    this.controllerFor('application').set('application', model);
  },

});
