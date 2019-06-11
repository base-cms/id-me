import Route from '@ember/routing/route';
import query from '@base-cms/id-me-manage/gql/queries/application/teams';
import AppQueryMixin from '@base-cms/id-me-manage/mixins/app-query';

export default Route.extend(AppQueryMixin, {
  model() {
    return this.query({ query }, 'teams');
  },
});
