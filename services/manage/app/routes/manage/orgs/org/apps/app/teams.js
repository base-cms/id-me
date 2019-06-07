import Route from '@ember/routing/route';
import query from '@base-cms/id-me-manage/gql/queries/application/teams';
import AppRouteMixin from '@base-cms/id-me-manage/mixins/app-route';

export default Route.extend(AppRouteMixin, {

  model() {
    return this.query({ query }, 'teams');
  },

});
