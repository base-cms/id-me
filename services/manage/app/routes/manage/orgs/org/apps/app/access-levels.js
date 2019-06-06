import Route from '@ember/routing/route';
import query from '@base-cms/id-me-manage/gql/queries/application/access-levels';
import ApplicationContext from '@base-cms/id-me-manage/mixins/application-context';

export default Route.extend(ApplicationContext, {

  model() {
    const app = this.modelFor('manage.orgs.org.apps.app');
    return this.query(app.id, { query });
  },

});
