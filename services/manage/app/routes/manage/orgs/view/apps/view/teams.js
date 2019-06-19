import Route from '@ember/routing/route';
import AppQueryMixin from '@base-cms/id-me-manage/mixins/app-query';
import RouteObservableMixin from '@base-cms/id-me-manage/mixins/route-observable';
import gql from 'graphql-tag';
import fragment from '@base-cms/id-me-manage/graphql/fragments/team-list';

const query = gql`
  query AppTeams($input: TeamsQueryInput = {}) {
    teams(input: $input) {
      edges {
        node {
          ...TeamListFragment
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
  ${fragment}
`;

export default Route.extend(AppQueryMixin, RouteObservableMixin, {
  async model() {
    const input = {
      sort: { field: 'updatedAt', order: 'desc' },
      pagination: { limit: 24 },
    };
    const variables = { input };
    const response = await this.query({ query, variables }, 'teams');
    this.getController().set('observable', this.getObservable(response));
    return response;
  },
});
